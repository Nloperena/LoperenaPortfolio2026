import {
  fillStandardFields,
  fillRequiredGreenhouse,
  uploadResume,
} from "./fill.mjs";

const EXPERIENCE = {
  react: "7",
  node: "6",
  python: "6",
  typescript: "6",
  "full stack": "8",
  aws: "6",
  java: "4",
  graphql: "3",
  cypress: "2",
  database: "7",
  postgresql: "7",
  relational: "7",
  sql: "7",
  next: "5",
  "next.js": "5",
  kubernetes: "2",
  docker: "5",
};

/** Fill LinkedIn Easy Apply modal steps (native + embedded ATS). */
export async function fillLinkedInModal(page, profile, resumePath) {
  const modal = page.locator('[data-test-modal], .jobs-easy-apply-modal, [role="dialog"]').first();
  const scope = (await modal.count()) ? modal : page;

  await fillStandardFields(scope, profile).catch(() => {});
  await fillLinkedInNativeFields(scope, profile).catch(() => {});
  await fillRequiredGreenhouse(scope, profile).catch(() => {});

  const resumeLabel = scope.locator("label, .jobs-document-upload__title, .jobs-document-upload-redesign-card__title").filter({ hasText: /v10|Resume_v10|v9|Resume_v9|v8|Resume_v8/i });
  if (await resumeLabel.count()) {
    const v10Label = resumeLabel.filter({ hasText: /v10|Resume_v10/i });
    if (await v10Label.count()) {
      await v10Label.first().click().catch(() => {});
    } else {
      await resumeLabel.first().click().catch(() => {});
    }
  } else {
    const v10Radio = scope.locator('input[type="radio"]').filter({ has: scope.locator('text=/v10/i') });
    if (await v10Radio.count()) {
      await v10Radio.first().click({ force: true }).catch(() => {});
    } else {
      const v9Radio = scope.locator('input[type="radio"]').filter({ has: scope.locator('text=/v9|v8/i') });
      if (await v9Radio.count()) {
        await v9Radio.first().click({ force: true }).catch(() => {});
      } else {
        await uploadResume(scope, resumePath).catch(() => {});
      }
    }
  }
}

async function fillLinkedInNativeFields(scope, profile) {
  const groups = scope.locator("fieldset, .jobs-easy-apply-form-section__group, .fb-dash-form-element");
  const count = await groups.count();

  for (let i = 0; i < count; i++) {
    const group = groups.nth(i);
    const text = ((await group.innerText().catch(() => "")) || "").replace(/\s+/g, " ");

    const select = group.locator("select").first();
    if (await select.count()) {
      await pickSelect(select, text, profile);
      continue;
    }

    const radios = group.locator('input[type="radio"]');
    if (await radios.count()) {
      await pickRadio(group, text, profile);
      continue;
    }

    const input = group.locator('input[type="text"], input[type="number"], textarea').first();
    if (!(await input.count()) || !(await input.isVisible().catch(() => false))) continue;
    const val = await input.inputValue().catch(() => "");
    if (val?.trim()) continue;

    if (/linkedin/i.test(text)) await input.fill(profile.linkedin);
    else if (/portfolio|website/i.test(text)) await input.fill(profile.portfolio);
    else if (/salary|compensation/i.test(text)) await input.fill("150000");
    else if (/location|intend to work|city/i.test(text)) {
      await input.fill("Kissimmee, Florida, United States");
      await input.press("Enter").catch(() => {});
    }
    else if (/why.*(company|role|interested|join|this position)/i.test(text)) {
      await input.fill(
        "I'm drawn to the mission and the chance to build scalable full-stack products with a strong engineering team. My background in React, Node, Python, and cloud platforms aligns well with the role."
      );
    } else if (/cover letter|additional information|anything else/i.test(text)) {
      await input.fill(
        "8+ years full-stack experience across React, TypeScript, Node.js, and Python. US authorized, no sponsorship needed. Portfolio: https://www.nicoloperena.com"
      );
    } else {
      for (const [skill, yrs] of Object.entries(EXPERIENCE)) {
        if (text.toLowerCase().includes(skill)) {
          await input.fill(yrs);
          break;
        }
      }
    }
  }
}

async function pickSelect(select, text, profile) {
  const current = await select.inputValue().catch(() => "");
  if (current) return;

  if (/sponsor|h-1b|visa/i.test(text) && !/authorized/i.test(text)) {
    await select.selectOption({ label: "No" }).catch(() => select.selectOption("No").catch(() => {}));
  } else if (/authorized|work authorization|legally authorized/i.test(text)) {
    await select.selectOption({ label: "Yes" }).catch(() => select.selectOption("Yes").catch(() => {}));
  } else if (/gender|race|veteran|disability|ethnic/i.test(text)) {
    await select
      .selectOption({ label: /decline|prefer not/i })
      .catch(() => select.selectOption({ index: 1 }).catch(() => {}));
  } else {
    const opts = await select.locator("option").allTextContents();
    const yes = opts.find((o) => /^yes$/i.test(o.trim()));
    if (yes && /remote|typescript|react|node|python|aws|experience|years/i.test(text)) {
      await select.selectOption({ label: yes.trim() }).catch(() => {});
    }
  }
}

async function pickRadio(group, text, profile) {
  const pick = async (re) => {
    const label = group.locator("label").filter({ hasText: re }).first();
    if (await label.count()) await label.click().catch(() => {});
  };

  if (/sponsor|h-1b|visa/i.test(text) && !/authorized/i.test(text)) {
    await pick(/^no$/i);
    return;
  }
  if (/authorized|work authorization|legally authorized|eligible to work/i.test(text)) {
    await pick(/^yes$/i);
    return;
  }
  if (/gender|race|veteran|disability|ethnic/i.test(text)) {
    await pick(/decline|prefer not/i);
    return;
  }

  const checked = await group.locator('input[type="radio"]:checked').count();
  if (checked) return;

  if (/remote|typescript|react|node|python|aws|full.?stack|ai tool|genai|llm|equity|early.?stage/i.test(text))
    await pick(/^yes$/i);
  else if (/database|relational|sql|postgres/i.test(text)) await pick(/7|6|5/i);
}

async function clickVisibleButton(scope, page, patterns) {
  for (const loc of patterns) {
    const btn = loc.first();
    if (!(await btn.isVisible().catch(() => false))) continue;
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await btn.click({ timeout: 8000 });
        await page.waitForTimeout(1500);
        return true;
      } catch {
        await page.waitForTimeout(400);
      }
    }
  }
  return false;
}

export async function clickModalNext(page) {
  const modal = page.locator('[data-test-modal], .jobs-easy-apply-modal, [role="dialog"]').first();
  const scope = (await modal.count()) ? modal : page;

  return clickVisibleButton(scope, page, [
    scope.locator('button[aria-label*="Continue to next step"]'),
    scope.locator('button[aria-label*="Review your application"]'),
    scope.locator("footer").locator("button").filter({ hasText: /^(Next|Review)$/i }),
    scope.locator('button').filter({ hasText: /^(Next|Review)$/i }),
  ]);
}

/** Click Review then Submit when the modal reaches the final step. */
export async function trySubmitApplication(page) {
  const modal = page.locator('[data-test-modal], .jobs-easy-apply-modal, [role="dialog"]').first();
  const scope = (await modal.count()) ? modal : page;

  await clickVisibleButton(scope, page, [
    scope.locator('button[aria-label*="Review your application"]'),
    scope.locator("footer").locator("button").filter({ hasText: /^Review$/i }),
  ]);

  const submitPatterns = [
    scope.locator('button[aria-label*="Submit application"]'),
    scope.locator("footer").locator("button").filter({ hasText: /^Submit application$|^Submit$/i }),
    scope.locator('button').filter({ hasText: /^Submit application$|^Submit$/i }),
  ];

  for (const loc of submitPatterns) {
    const btn = loc.first();
    if (!(await btn.isVisible().catch(() => false))) continue;
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await btn.click({ timeout: 8000 });
        await page.waitForTimeout(3000);
        return true;
      } catch {
        await page.waitForTimeout(500);
      }
    }
  }
  return false;
}

export async function dismissPostApply(page) {
  for (const re of [/Not now/i, /Got it/i, /Done/i, /Dismiss/i]) {
    const btn = page.getByRole("button", { name: re }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(800);
    }
  }
}

export async function detectDailyLimit(page) {
  const body = await page.locator("body").innerText().catch(() => "");
  return /daily.*(Easy Apply|submission)|limit.*Easy Apply|apply tomorrow/i.test(body);
}
