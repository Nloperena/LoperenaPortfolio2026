#!/usr/bin/env python3
"""Generate Nicholas_Loperena_Resume_v10.pdf from resume-v10 content."""

from pathlib import Path
import shutil

try:
    from fpdf import FPDF
except ImportError:
    raise SystemExit("Install fpdf2: pip install fpdf2")

OUT_DIR = Path(__file__).resolve().parent
OUT_FILE = OUT_DIR / "Nicholas_Loperena_Resume_v10.pdf"
DOCS_COPY = Path.home() / "Documents" / "JobSearch" / "Nicholas_Loperena_Resume_v10.pdf"
PUBLIC_COPY = OUT_DIR.parent / "astro-rebuild" / "public" / "Nicholas_Loperena_Resume_v10.pdf"


class ResumePDF(FPDF):
    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, "Nicholas Loperena | Senior Full-Stack Engineer", align="C")


def section_title(pdf: FPDF, text: str) -> None:
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(20, 20, 20)
    pdf.cell(0, 7, text.upper(), new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(180, 180, 180)
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.w - pdf.l_margin, pdf.get_y())
    pdf.ln(3)


def job_header(pdf: FPDF, role: str, company: str, loc: str, dates: str) -> None:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(20, 20, 20)
    pdf.cell(0, 5, role, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(60, 60, 60)
    pdf.cell(0, 5, f"{company} | {loc} | {dates}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)


def bullet(pdf: FPDF, text: str) -> None:
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(pdf.epw, 5, f"  - {text}")


def para(pdf: FPDF, text: str) -> None:
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(pdf.epw, 5, text)


def build() -> Path:
    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.add_page()
    pdf.set_margins(18, 16, 18)

    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(10, 10, 10)
    pdf.cell(0, 8, "Nicholas (Nico) Loperena", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(
        0,
        5,
        "Senior Full-Stack Engineer | Product-focused delivery - React, Next.js, Node.js, TypeScript | PostgreSQL - Remote",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(1)

    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(50, 50, 50)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(
        pdf.epw,
        4.5,
        "Kissimmee, FL 34744 | nicholasloperena@gmail.com | 407-790-5891\n"
        "linkedin.com/in/nicholas-loperena | github.com/NLoperena | nicoloperena.com",
    )
    pdf.ln(2)

    section_title(pdf, "Summary")
    para(
        pdf,
        "Product-focused senior full-stack engineer in Kissimmee, FL, open to remote roles with US employers. "
        "Eight years from IT infrastructure and web development into owning end-to-end delivery for B2B "
        "manufacturing, e-commerce, and client platforms - UI through API to deploy.",
    )
    pdf.ln(1)
    para(
        pdf,
        "React, Next.js, Node.js, TypeScript, Python, and PostgreSQL on Vercel and AWS. Strong in migrations, "
        "SEO-driven product work, stakeholder collaboration, and AI-assisted engineering (reviewed and owned like "
        "any other code).",
    )
    pdf.ln(1)
    para(
        pdf,
        "Recent: senior full-stack engineer at Forza (Jan 2025 to May 2026), rebuilding ForzaBuilt.com and "
        "RuggedRed.com on React/Astro (99% Lighthouse, 28 MQLs in four months, record inbound lead). Built and "
        "operate Nexrena client-ops platform (part-time). Led US Shopify storefront for VITO Fryfilter (+285% YoY "
        "traffic, 2.8% conversion, testimonial automation still in production).",
    )

    section_title(pdf, "Technical Skills")
    for s in [
        "Frontend: React, Next.js, Astro, TypeScript, JavaScript, HTML/CSS, Tailwind CSS",
        "Backend: Node.js, Express, Python, REST APIs, authentication, Prisma",
        "Data: PostgreSQL",
        "Deploy & hosting: Vercel, AWS (EC2, S3, CloudFront), CDN tuning, Core Web Vitals",
        "AI & workflow: Cursor, OpenAI API integrations, Git, code review",
        "Other: Shopify (Liquid), WordPress, Elementor",
    ]:
        bullet(pdf, s)

    section_title(pdf, "Experience")
    jobs = [
        (
            "Senior Full-Stack Engineer",
            "Forza",
            "Remote",
            "Jan 2025 - May 2026",
            [
                "Led product-focused full-stack delivery for a multi-brand industrial adhesives manufacturer",
                "Rebuilt ForzaBuilt.com and RuggedRed.com on React/Astro; WordPress migration with 99% Lighthouse desktop and 28 MQLs in four months post-launch",
                "Shipped interactive product tools (calculators, selectors) and procurement-focused IA on Vercel",
                "Owned cross-brand web architecture, release cadence, and production deployments with design and leadership",
                "Employee of the Month (September 2025)",
            ],
        ),
        (
            "Lead Full-Stack Engineer",
            "Nexrena",
            "Remote",
            "Apr 2024 - Present",
            [
                "Part-time alongside full-time roles; sole builder of custom platform (Next.js, Node/Express, PostgreSQL/Prisma) for CRM, project management, invoicing, and client delivery",
                "REST API integrations and AI-assisted intake workflows; internal tooling connected to live system data",
                "Replaced multiple SaaS tools with a single owned operations stack",
            ],
        ),
        (
            "Full-Stack Web Developer",
            "VITO Fryfilter, Inc.",
            "Orlando, FL",
            "Dec 2023 - Sep 2024",
            [
                "Sole US technical hire; owned Shopify storefront (shop.vitofryfilter.com), custom front-end, and CDN integrations",
                "Built store on Liquid, HTML/CSS/JS: product quiz, calculator, and SEO product pages",
                "Store traffic +285% YoY, orders +40%, 2.8% conversion rate (Jan-May 2024 vs 2023)",
                "Automated testimonial pipeline tied to company CDN; Google reviews grew from 8 to 40+ without manual upkeep",
            ],
        ),
        (
            "Full-Stack Web Developer & SEO Specialist",
            "Villa Marketers",
            "Remote",
            "Mar 2022 - Mar 2024",
            [
                "Part-time. Technical WordPress development and on-page SEO across a multi-client vacation rental portfolio",
                "Maintained 11+ WordPress sites at 99%+ uptime (Elementor, Yoast, performance tuning, plugin management)",
                "First-page Google rankings for high-value vacation rental keywords via content architecture and internal linking",
            ],
        ),
        (
            "Help Desk Admin / Junior Developer",
            "Furniture Packages USA",
            "Kissimmee, FL",
            "May 2020 - Dec 2023",
            [
                "Full-time. Company network infrastructure, help desk, and early marketing automation",
                "Implemented MailChimp campaigns and newsletter systems; built internal web tooling",
                "Primary technical contact translating business requirements into deployed software for a small team",
            ],
        ),
    ]
    for role, company, loc, dates, bullets in jobs:
        job_header(pdf, role, company, loc, dates)
        for b in bullets:
            bullet(pdf, b)
        pdf.ln(1)

    section_title(pdf, "Education & Certifications")
    for e in [
        "UCF Coding Boot Camp - Full-Stack Web Development (Certificate, Aug 2019)",
        "University of Central Florida - Cybersecurity Program (Oct 2019 - Mar 2020)",
        "Valencia College - Business Certificate (2015 - 2016)",
    ]:
        bullet(pdf, e)

    section_title(pdf, "Languages")
    para(pdf, "English (native) | Spanish (limited working proficiency)")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT_FILE))
    DOCS_COPY.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUT_FILE, DOCS_COPY)
    PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUT_FILE, PUBLIC_COPY)
    return OUT_FILE


if __name__ == "__main__":
    path = build()
    print(f"Wrote {path}")
    print(f"Wrote {DOCS_COPY}")
    print(f"Wrote {PUBLIC_COPY}")
