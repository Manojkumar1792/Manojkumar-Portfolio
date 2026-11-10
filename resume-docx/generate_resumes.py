# One-off generator for ATS-optimized Word resumes. Run with: python generate_resumes.py
import os
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.opc.constants import RELATIONSHIP_TYPE as RT

OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Brand palette - matches the live portfolio's navy/gold theme
NAVY = RGBColor(0x14, 0x1A, 0x2E)
GOLD = RGBColor(0xA9, 0x84, 0x1F)
GOLD_HEX = "A9841F"
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GOLD = RGBColor(0xE8, 0xD9, 0xA8)
SLATE = RGBColor(0x3A, 0x3F, 0x4B)
HEADER_FILL = "141A2E"

PORTFOLIO_URL = "https://manojkumar1792.github.io/Manojkumar-Portfolio/"
CONTACT = "9698162889   |   mkmanojmsc@gmail.com   |   Chennai, Tamil Nadu, India   |   linkedin.com/in/manoj-kumar-s-a-56a82492   |   github.com/Manojkumar1792"

FIS_GLOBAL_BULLETS = [
    "Functional Validation: Performed functional validation for payment systems and digital banking applications across multiple BFS projects.",
    "Complex Test Scenarios: Designed and executed complex test scenarios covering end-to-end functional, integration, and regression testing.",
    "Defect Management: Managed full lifecycle defects using Jira and HP Quality Centre, with deep root cause analysis and fix verification.",
    "Requirement Traceability: Maintained 100% requirement traceability through detailed documentation and comprehensive test coverage reports.",
    "Domain Expertise: Deep BFS knowledge validating complex payment workflows, compliance rules, and digital banking features.",
    "Process Improvement: Reduced regression execution time by 20% through optimised test case design.",
    "Client Delivery: Supported multiple client go-lives ensuring zero defect delivery and strong production stability.",
    "Leadership: Acted as senior QA lead, mentoring junior testers and driving knowledge-sharing sessions.",
]
FIS_GLOBAL_TOOLS = "SQL, Jira, HP Quality Centre, Data Navigator, Digital Banking, BFS Domain, Regression Testing"

AI_AGENTS = [
    ("Skip Level Agent", "AI assistant for skip-level conversations; captures feedback, detects risk signals, and structures insights for leadership."),
    ("Release Checklist Agent", "Converts a single release-lock date into a fully-dated 21-step checklist, with automated email reminders for overdue items."),
    ("AI Upliftment Program Hub", "Live leaderboard and dashboard tracking AI adoption, use cases, and training completions across teams."),
    ("User Onboarding Agent", "Guides users through core banking product setup, compliance workflows, and product selection."),
    ("Intelligent Frontend Scaffold Agent", "Reads a backend codebase or API contract and auto-generates a full React + TypeScript application."),
    ("Intelligent Testing Agent", "Unified web agent to create, select, execute, and manage automated test runs with real-time reporting."),
    ("NSSPAR Playwright Agent", "Enterprise Playwright framework replacing TOSCA; smoke, regression, and cross-browser CI/CD gates with Azure DevOps integration."),
    ("AgentVerse", "Serverless platform for a prompt-driven AI agent-building competition with live judged scoring and an auto-generated winners video."),
]

CERTS_COMMON = [
    ("Certified Scrum Master (CSM)", "Scrum Alliance"),
    ("TOSCA - 7 Certifications (AS1, AS2, AE1, TDS1, TDS2, TQM, TA1)", "Tricentis"),
    ("NeoLoad Performance Testing", "Neotys Certified"),
    ("AI Agent Development", "Applied AI Engineering"),
]

EDUCATION = ("M.Sc. Software Engineering", "KCET, Virudhunagar - 2014", "Specialisation: Software Quality & Engineering")

ROLES = {
    "QA_Lead": {
        "filename": "Manojkumar_SA_QA_Lead_Resume.docx",
        "title": "QA Lead  |  Agile Lead  |  AI Tester",
        "summary": (
            "QA Lead with 11+ years in Banking & Financial Services, hands-on leading a 12-member Agile squad "
            "through daily sprint execution, test strategy, and release-day decision making. Deeply involved in "
            "requirements elicitation, test design, UAT coordination, and defect triage across payment rails "
            "(ACH, RTP, P2P). Holder of 7 Tricentis TOSCA certifications and CSM certified. First in team to "
            "design and ship 8 production AI agents now running in live enterprise workflows. Targeting QA Lead "
            "and AI Tester roles where hands-on technical leadership drives quality."
        ),
        "ai_expertise": [
            "AI Agent Development: Engineered 8 production AI agents covering leadership intelligence, release management, program analytics, user onboarding, frontend scaffolding, and enterprise test automation (NSSPAR Playwright).",
            "Prompt Engineering: Skilled in crafting precise prompts for LLMs (GPT-4, Claude, Gemini) to generate test cases, BRD/FRD content, acceptance criteria, and automated QA workflows directly from requirements.",
            "AI-Assisted Test Automation: Leveraged AI-assisted code generation to accelerate Playwright script creation, intelligent defect analysis, and automated test data setup, reducing scripting time by over 40%.",
            "Generative AI in QA Leadership: Applied GenAI tools to sprint reporting, test coverage gap analysis, risk identification, and stakeholder communication, making QA processes faster and data-driven.",
            "AI in Banking & FinTech: Applied AI to intelligent onboarding flows, anomaly detection concepts, and smart requirement validation in payment domain projects.",
        ],
        "ai_tools": "GitHub Copilot, ChatGPT/GPT-4, Claude, Gemini, Prompt Engineering, LLM/GenAI, AI Agent Orchestration, RAG Concepts, AI-Assisted Testing, Playwright + AI",
        "fiserv_role": "QA Lead / Agile Lead / AI Tester",
        "fiserv_bullets": [
            "Agile Squad Leadership: Directed a 12-member Agile squad to deliver end-to-end onboarding and payment solutions across multiple critical production releases.",
            "AI-Driven Onboarding: Designed intelligent onboarding agents using Generative AI workflows, directly improving process efficiency and user experience.",
            "QA Automation Partnership: Partnered with QA automation teams using Tricentis TOSCA to scale regression coverage and reduce testing execution effort.",
            "UAT Leadership: Directed full lifecycle UAT coordination, defect triage, issue tracking, and release validation to secure critical business sign-offs.",
            "Cross-Functional Collaboration: Collaborated with stakeholders to validate requirements, define acceptance criteria, and ensure complete test readiness.",
            "Long-Term Tenure: 5+ years of consistent contributions demonstrating reliability, domain expertise, and organisational commitment.",
            "Team Leadership: Mentored junior QA engineers, delegated effectively, and fostered accountability and continuous improvement.",
            "Process Optimisation: Streamlined defect management workflows, reducing cycle time by 25%.",
            "Client Engagement: Engaged clients in requirement workshops and release demos, strengthening trust and transparency.",
            "Strategic Impact: Enhanced onboarding success rates and improved payment system stability at enterprise scale.",
        ],
        "fiserv_tools": "TOSCA, Agile/Scrum, Jira, ACH/RTP/P2P, UAT, BRD/FRD, GenAI/LLM, NSSPAR/PAR, PI Planning, Playwright",
        "achievements": [
            "Recognised for consistent performance and Agile leadership across critical banking platform releases at Fiserv.",
            "Awarded for excellence in stakeholder collaboration and cross-functional process improvement initiatives.",
            "First in team to design and ship 8 production AI agents, adopted as standard enterprise workflow tools.",
            "Delivered 3 major banking platform releases on time with zero critical production defects as Agile Lead.",
            "Expanded TOSCA regression suite across all 7 certification levels, achieving a 40% reduction in manual testing effort.",
            "Led cross-functional squads delivering banking and payment capabilities with consistently high stakeholder satisfaction.",
        ],
        "core_skills": [
            "QA Strategy & Team Leadership - Expert", "Agile/Scrum/PI Planning - Expert", "TOSCA Automation - Expert",
            "UAT Coordination - Expert", "Requirements/BRD/FRD - Expert", "Payments (ACH/RTP/P2P) - Expert",
            "AI Agent Development - Advanced", "Playwright/CI-CD - Advanced",
        ],
        "tools": "TOSCA, Playwright, Jira, Confluence, VersionOne, SQL, NeoLoad, HP QC, Azure DevOps, Tableau, Power BI, Visio, GitHub Copilot, GenAI/LLM, GitHub",
        "certs": [("Certified Scrum Master (CSM)", "Scrum Alliance")] + CERTS_COMMON[1:],
        "open_to": "QA Lead, Agile Lead, AI Tester - Chennai, TN - Remote/Hybrid/Onsite",
    },
    "QA_Manager": {
        "filename": "Manojkumar_SA_QA_Manager_Resume.docx",
        "title": "QA Manager  |  QA Lead  |  Agile Lead",
        "summary": (
            "QA Manager with 11+ years in Banking & Financial Services, owning QA strategy, process governance, "
            "and delivery outcomes for a 12-member Agile squad. Skilled in stakeholder management, risk-based test "
            "planning, resource allocation, Agile delivery, and UAT sign-off across payment rails (ACH, RTP, P2P). "
            "Holder of 7 Tricentis TOSCA certifications and CSM certified. First in team to design and ship 8 "
            "production AI agents now running in live enterprise workflows, driving data-driven quality management. "
            "Targeting QA Manager and senior QA leadership roles."
        ),
        "ai_expertise": [
            "AI Agent Development: Engineered 8 production AI agents covering leadership intelligence, release management, program analytics, user onboarding, frontend scaffolding, and enterprise test automation (NSSPAR Playwright).",
            "Prompt Engineering: Skilled in crafting precise prompts for LLMs (GPT-4, Claude, Gemini) to generate test cases, BRD/FRD content, acceptance criteria, and automated QA workflows directly from requirements.",
            "AI-Assisted Test Automation: Leveraged AI-assisted code generation to accelerate Playwright script creation, intelligent defect analysis, and automated test data setup, reducing scripting time by over 40%.",
            "Generative AI in QA Leadership: Applied GenAI tools to sprint reporting, test coverage gap analysis, risk identification, and stakeholder communication, making QA processes faster and data-driven.",
            "AI in Banking & FinTech: Applied AI to intelligent onboarding flows, anomaly detection concepts, and smart requirement validation in payment domain projects.",
        ],
        "ai_tools": "GitHub Copilot, ChatGPT/GPT-4, Claude, Gemini, Prompt Engineering, LLM/GenAI, AI Agent Orchestration, RAG Concepts, AI-Assisted Testing, Playwright + AI",
        "fiserv_role": "QA Manager / QA Lead / Agile Lead",
        "fiserv_bullets": [
            "QA Strategy Ownership: Owned end-to-end QA strategy and process governance for a 12-member Agile squad delivering onboarding and payment solutions across critical production releases.",
            "Resource & Capacity Planning: Managed staffing, workload distribution, and capacity planning across sprints to balance quality coverage with delivery timelines.",
            "QA Automation Partnership: Directed QA automation strategy with Tricentis TOSCA to scale regression coverage and reduce testing execution effort.",
            "UAT & Release Governance: Owned full lifecycle UAT coordination, defect triage governance, and release sign-off to secure critical business approvals.",
            "Stakeholder Management: Acted as primary QA point of contact for senior stakeholders, reporting quality metrics, risk status, and release readiness.",
            "Long-Term Tenure: 5+ years of consistent contributions demonstrating reliability, domain expertise, and organisational commitment.",
            "Team Management: Managed performance reviews, mentoring, and career development for QA engineers across the squad.",
            "Process Optimisation: Streamlined defect management workflows, reducing cycle time by 25%.",
            "Client Engagement: Led requirement workshops and release demos with clients, strengthening trust and transparency.",
            "Strategic Impact: Enhanced onboarding success rates and improved payment system stability at enterprise scale.",
        ],
        "fiserv_tools": "TOSCA, Agile/Scrum, Jira, ACH/RTP/P2P, UAT, BRD/FRD, GenAI/LLM, NSSPAR/PAR, PI Planning, Playwright",
        "achievements": [
            "Recognised for consistent performance and QA leadership across critical banking platform releases at Fiserv.",
            "Awarded for excellence in stakeholder collaboration and cross-functional process improvement initiatives.",
            "First in team to design and ship 8 production AI agents, adopted as standard enterprise workflow tools.",
            "Delivered 3 major banking platform releases on time with zero critical production defects as QA owner.",
            "Expanded TOSCA regression suite across all 7 certification levels, achieving a 40% reduction in manual testing effort.",
            "Managed cross-functional squads delivering banking and payment capabilities with consistently high stakeholder satisfaction.",
        ],
        "core_skills": [
            "QA Strategy & Process Governance - Expert", "Team & Resource Management - Expert", "Stakeholder & Risk Management - Expert",
            "Agile/Scrum/PI Planning - Expert", "UAT & Release Sign-Off - Expert", "Payments (ACH/RTP/P2P) - Expert",
            "AI Agent Development - Advanced", "Playwright/CI-CD - Advanced",
        ],
        "tools": "TOSCA, Playwright, Jira, Confluence, VersionOne, SQL, NeoLoad, HP QC, Azure DevOps, Tableau, Power BI, Visio, GitHub Copilot, GenAI/LLM, GitHub",
        "certs": CERTS_COMMON,
        "open_to": "QA Manager, QA Lead, Agile Lead - Chennai, TN - Remote/Hybrid/Onsite",
    },
    "AI_Engineer": {
        "filename": "Manojkumar_SA_AI_Engineer_Resume.docx",
        "title": "AI Engineer  |  Agentic Automation Builder  |  QA Lead (Banking)",
        "summary": (
            "AI Engineer with 11+ years in Banking & Financial Services, now focused on designing and shipping "
            "production AI agents. Engineered 8 agentic systems now running in live enterprise workflows, spanning "
            "leadership intelligence, release management, program analytics, intelligent onboarding, full-stack frontend scaffolding, and "
            "enterprise test automation (NSSPAR Playwright). Skilled in prompt engineering, LLM orchestration, and "
            "GenAI workflow design, grounded in deep domain knowledge of payment rails (ACH, RTP, P2P) from leading "
            "a 12-member Agile squad at Fiserv. Holder of 7 Tricentis TOSCA certifications and CSM certified. "
            "Targeting AI Engineer and agentic automation roles."
        ),
        "ai_expertise": [
            "AI Agent Development: Designed and shipped 8 production AI agents covering leadership intelligence, release management, program analytics, user onboarding, frontend scaffolding, and enterprise test automation (NSSPAR Playwright).",
            "Agent Orchestration: Built multi-step agentic workflows that read source systems (APIs, meetings, backend code) and autonomously produce structured, actionable outputs.",
            "Prompt Engineering: Skilled in crafting precise prompts for LLMs (GPT-4, Claude, Gemini) to generate test cases, BRD/FRD content, acceptance criteria, and automated QA workflows directly from requirements.",
            "AI-Assisted Automation: Leveraged AI-assisted code generation to accelerate Playwright script creation, intelligent defect analysis, and automated test data setup, reducing scripting time by over 40%.",
            "Domain-Grounded AI: Applied AI to intelligent onboarding flows, anomaly detection concepts, and smart requirement validation in payment domain projects.",
        ],
        "ai_tools": "GitHub Copilot, ChatGPT/GPT-4, Claude, Gemini, Prompt Engineering, LLM/GenAI, AI Agent Orchestration, RAG Concepts, React/TypeScript, Playwright + AI",
        "fiserv_role": "AI Engineer / QA Lead / Agile Lead",
        "fiserv_bullets": [
            "AI Agent Engineering: Designed, built, and shipped 8 production AI agents, each solving a distinct operational problem across leadership feedback, release management, onboarding, analytics, scaffolding, and test automation.",
            "GenAI Onboarding Workflows: Engineered intelligent onboarding agents using Generative AI workflows, directly improving process efficiency and user experience for a core banking onboarding platform.",
            "Agent-Driven Test Automation: Built the NSSPAR Playwright agent, replacing Tricentis TOSCA with an AI-assisted framework for smoke, regression, and cross-browser CI/CD gates.",
            "Agile Squad Leadership: Directed a 12-member Agile squad delivering end-to-end onboarding and payment solutions across multiple critical production releases.",
            "Cross-Functional Collaboration: Partnered with stakeholders to validate requirements, define acceptance criteria, and ensure AI-driven workflows met business needs.",
            "First in Team: First engineer in the organisation to design and ship production AI agents that are now a standard workflow tool.",
            "Long-Term Tenure: 5+ years of consistent contributions demonstrating reliability, domain expertise, and organisational commitment.",
            "Process Optimisation: Streamlined defect management workflows, reducing cycle time by 25%.",
            "Client Engagement: Engaged clients in requirement workshops and release demos, strengthening trust and transparency.",
            "Strategic Impact: Enhanced onboarding success rates and improved payment system stability at enterprise scale.",
        ],
        "fiserv_tools": "GitHub Copilot, GenAI/LLM, Playwright, React/TypeScript, Agile/Scrum, TOSCA, ACH/RTP/P2P, NSSPAR/PAR, Azure DevOps",
        "achievements": [
            "First in team to design and ship 8 production AI agents, adopted as standard enterprise workflow tools.",
            "Built an agentic test-automation framework (NSSPAR Playwright Agent) that replaced Tricentis TOSCA for a major release pipeline.",
            "Reduced Playwright scripting time by 40% through AI-assisted code generation and prompt engineering.",
            "Recognised for engineering innovation and AI-driven process transformation across critical banking platform releases.",
            "Awarded for excellence in stakeholder collaboration and cross-functional process improvement initiatives.",
            "Delivered 3 major banking platform releases on time with zero critical production defects as Agile Lead.",
        ],
        "core_skills": [
            "AI Agent Development - Expert", "Prompt Engineering (LLMs) - Expert", "GenAI Workflow Design - Advanced",
            "React/TypeScript Scaffolding - Advanced", "Playwright/CI-CD - Advanced", "QA Strategy & Leadership - Expert",
            "Agile/Scrum/PI Planning - Expert", "Payments (ACH/RTP/P2P) - Expert",
        ],
        "tools": "GitHub Copilot, GenAI/LLM, Playwright, React, TypeScript, Azure DevOps, TOSCA, Jira, Confluence, SQL, GitHub",
        "certs": [CERTS_COMMON[3], CERTS_COMMON[0], CERTS_COMMON[1], CERTS_COMMON[2]],
        "open_to": "AI Engineer, AI Tester, QA Lead (Banking) - Chennai, TN - Remote/Hybrid/Onsite",
    },
    "AI_Tester": {
        "filename": "Manojkumar_SA_AI_Tester_Resume.docx",
        "title": "AI Tester  |  AI-Augmented QA Engineer  |  QA Lead (Banking)",
        "summary": (
            "AI Tester with 11+ years in Banking & Financial Services, pioneering AI-augmented testing practices. "
            "Uses GenAI, prompt engineering, and autonomous agents to accelerate test design, test automation, and "
            "defect analysis, including a production Playwright agent that replaced Tricentis TOSCA for NSSPAR "
            "regression. Deep hands-on QA background leading a 12-member Agile squad across payment rails (ACH, "
            "RTP, P2P), UAT coordination, and defect triage. Holder of 7 Tricentis TOSCA certifications and CSM "
            "certified. Targeting AI Tester and AI-augmented QA engineering roles."
        ),
        "ai_expertise": [
            "AI-Assisted Test Automation: Leveraged AI-assisted code generation to accelerate Playwright script creation, intelligent defect analysis, and automated test data setup, reducing scripting time by over 40%.",
            "Agentic Test Framework: Built the NSSPAR Playwright Agent, an enterprise framework replacing TOSCA with smoke, regression, and cross-browser CI/CD gates driven by AI-assisted flaky-test triage.",
            "Prompt Engineering for QA: Skilled in crafting precise prompts for LLMs (GPT-4, Claude, Gemini) to generate test cases, acceptance criteria, and automated QA workflows directly from requirements.",
            "Generative AI in QA: Applied GenAI tools to test coverage gap analysis, risk identification, sprint reporting, and stakeholder communication, making QA processes faster and data-driven.",
            "AI Agent Development: Engineered 8 production AI agents spanning leadership intelligence, release management, program analytics, onboarding, and frontend scaffolding.",
        ],
        "ai_tools": "GitHub Copilot, ChatGPT/GPT-4, Claude, Gemini, Prompt Engineering, LLM/GenAI, AI-Assisted Testing, Playwright + AI, Flaky-Test Triage, Azure DevOps",
        "fiserv_role": "AI Tester / QA Lead / Agile Lead",
        "fiserv_bullets": [
            "AI-Driven Test Automation: Built and maintained the NSSPAR Playwright Agent, an AI-assisted framework replacing Tricentis TOSCA for smoke, regression, and cross-browser test gates.",
            "AI-Assisted Defect Analysis: Used GenAI tooling to accelerate defect triage, root cause hypotheses, and test data generation across payment rails (ACH, RTP, P2P).",
            "Agile Squad Leadership: Directed a 12-member Agile squad delivering end-to-end onboarding and payment solutions across multiple critical production releases.",
            "UAT Leadership: Directed full lifecycle UAT coordination, defect triage, issue tracking, and release validation to secure critical business sign-offs.",
            "Cross-Functional Collaboration: Collaborated with stakeholders to validate requirements, define acceptance criteria, and ensure complete AI-augmented test readiness.",
            "First in Team: First QA professional in the organisation to design and ship production AI agents now used across the team.",
            "Long-Term Tenure: 5+ years of consistent contributions demonstrating reliability and deep domain expertise.",
            "Process Optimisation: Streamlined defect management workflows, reducing cycle time by 25%.",
            "Team Mentorship: Mentored junior QA engineers on AI-assisted testing practices and continuous improvement.",
            "Strategic Impact: Enhanced onboarding success rates and improved payment system stability at enterprise scale.",
        ],
        "fiserv_tools": "Playwright, TOSCA, GenAI/LLM, Azure DevOps, Agile/Scrum, Jira, ACH/RTP/P2P, UAT, NSSPAR/PAR",
        "achievements": [
            "Replaced Tricentis TOSCA with an AI-assisted Playwright framework, cutting manual regression effort by 40%.",
            "First in team to design and ship 8 production AI agents, adopted as standard enterprise workflow tools.",
            "Reduced Playwright scripting time by 40% through AI-assisted code generation and prompt engineering.",
            "Recognised for consistent performance and QA innovation across critical banking platform releases at Fiserv.",
            "Awarded for excellence in stakeholder collaboration and cross-functional process improvement initiatives.",
            "Delivered 3 major banking platform releases on time with zero critical production defects.",
        ],
        "core_skills": [
            "AI-Assisted Test Automation - Expert", "Playwright/CI-CD - Expert", "Prompt Engineering (LLMs) - Advanced",
            "TOSCA Automation - Expert", "UAT Coordination - Expert", "Defect Triage & RCA - Expert",
            "Agile/Scrum/PI Planning - Expert", "Payments (ACH/RTP/P2P) - Expert",
        ],
        "tools": "Playwright, TOSCA, GitHub Copilot, GenAI/LLM, Azure DevOps, Jira, Confluence, SQL, NeoLoad, HP QC, Tableau, GitHub",
        "certs": [CERTS_COMMON[1], CERTS_COMMON[3], CERTS_COMMON[0], CERTS_COMMON[2]],
        "open_to": "AI Tester, AI Engineer, QA Lead (Banking) - Chennai, TN - Remote/Hybrid/Onsite",
    },
}


def set_cell_free_doc(doc):
    """Base ATS-friendly document: single column, standard font, no headers/footers."""
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10.5)
    rpr = style.element.get_or_add_rPr()
    rFonts = rpr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rpr.append(rFonts)
    rFonts.set(qn("w:eastAsia"), "Calibri")

    section = doc.sections[0]
    section.left_margin = Inches(0.6)
    section.right_margin = Inches(0.6)
    section.top_margin = Inches(0.5)
    section.bottom_margin = Inches(0.5)
    return doc


def add_heading(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    lead = p.add_run("\u25A0 ")
    lead.bold = True
    lead.font.size = Pt(10)
    lead.font.color.rgb = GOLD
    run = p.add_run(text.upper())
    run.bold = True
    run.font.size = Pt(12)
    run.font.color.rgb = NAVY
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "10")
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), GOLD_HEX)
    pBdr.append(bottom)
    pPr.append(pBdr)
    return p


def add_bullet(doc, text, bold_lead=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(2)
    if bold_lead:
        r1 = p.add_run(bold_lead)
        r1.bold = True
        r1.font.color.rgb = NAVY
        p.add_run(text)
    else:
        p.add_run(text)
    for r in p.runs:
        r.font.size = Pt(10)
    return p


def add_line_bullet_from_colon(doc, full_text):
    """Split 'Label: rest of sentence' into a bold label + normal text bullet."""
    if ":" in full_text:
        label, rest = full_text.split(":", 1)
        add_bullet(doc, rest, bold_lead=label + ": ")
    else:
        add_bullet(doc, full_text)


def add_plain(doc, text, size=10, italic=False, bold=False, space_after=4, color=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.italic = italic
    r.bold = bold
    if color:
        r.font.color.rgb = color
    return p


def shade_paragraph(paragraph, hex_fill):
    pPr = paragraph._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_fill)
    pPr.append(shd)


def add_hyperlink(paragraph, url, text, color_hex=GOLD_HEX, bold=True, size=11):
    part = paragraph.part
    r_id = part.relate_to(url, RT.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), "Calibri")
    rPr.append(rFonts)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size * 2)))
    rPr.append(sz)
    if bold:
        rPr.append(OxmlElement("w:b"))
    u = OxmlElement("w:u")
    u.set(qn("w:val"), "single")
    rPr.append(u)
    c = OxmlElement("w:color")
    c.set(qn("w:val"), color_hex)
    rPr.append(c)
    new_run.append(rPr)
    t = OxmlElement("w:t")
    t.text = text
    new_run.append(t)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def build_resume(role_key, data):
    doc = Document()
    set_cell_free_doc(doc)

    # ---- NAVY HEADER BANNER with gold accents ----
    p_name = doc.add_paragraph()
    p_name.paragraph_format.space_before = Pt(10)
    p_name.paragraph_format.space_after = Pt(2)
    shade_paragraph(p_name, HEADER_FILL)
    r = p_name.add_run("Manojkumar SA")
    r.bold = True
    r.font.size = Pt(24)
    r.font.color.rgb = WHITE

    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_after = Pt(6)
    shade_paragraph(p_title, HEADER_FILL)
    rt = p_title.add_run(data["title"])
    rt.bold = True
    rt.font.size = Pt(11)
    rt.font.color.rgb = LIGHT_GOLD

    p_contact = doc.add_paragraph()
    p_contact.paragraph_format.space_after = Pt(4)
    shade_paragraph(p_contact, HEADER_FILL)
    rc = p_contact.add_run(CONTACT)
    rc.font.size = Pt(9)
    rc.font.color.rgb = WHITE

    p_port = doc.add_paragraph()
    p_port.paragraph_format.space_before = Pt(2)
    p_port.paragraph_format.space_after = Pt(10)
    shade_paragraph(p_port, HEADER_FILL)
    rp_lbl = p_port.add_run("\u2605 LIVE PORTFOLIO:  ")
    rp_lbl.bold = True
    rp_lbl.font.size = Pt(9.5)
    rp_lbl.font.color.rgb = GOLD
    add_hyperlink(p_port, PORTFOLIO_URL, PORTFOLIO_URL, color_hex="FFFFFF", bold=True, size=9.5)

    # Summary
    add_heading(doc, "Professional Summary")
    add_plain(doc, data["summary"], size=10, space_after=6)

    # AI Expertise
    add_heading(doc, "AI & Automation Expertise")
    for item in data["ai_expertise"]:
        add_line_bullet_from_colon(doc, item)
    add_plain(doc, "Tools: " + data["ai_tools"], size=9.5, italic=True, space_after=6)

    # Experience - Fiserv
    add_heading(doc, "Professional Experience")
    add_plain(doc, "Fiserv - " + data["fiserv_role"], bold=True, size=11, space_after=0, color=NAVY)
    add_plain(doc, "Chennai, Tamil Nadu, India  |  Banking & FinTech - Payments & Onboarding  |  Feb 2020 - Present (5+ yrs, Current)", italic=True, size=9.5, space_after=3)
    for item in data["fiserv_bullets"]:
        add_line_bullet_from_colon(doc, item)
    add_plain(doc, "Tools: " + data["fiserv_tools"], size=9.5, italic=True, space_after=6)

    # Experience - FIS Global
    add_plain(doc, "FIS Global - Software Test Analyst I & II", bold=True, size=11, space_after=0, color=NAVY)
    add_plain(doc, "Chennai, Tamil Nadu, India  |  Banking & Financial Services (BFS)  |  Jul 2015 - Feb 2020 (4.5 yrs)", italic=True, size=9.5, space_after=3)
    for item in FIS_GLOBAL_BULLETS:
        add_line_bullet_from_colon(doc, item)
    add_plain(doc, "Tools: " + FIS_GLOBAL_TOOLS, size=9.5, italic=True, space_after=6)

    # AI Agents
    add_heading(doc, "AI Agents Engineered - 8 Production Systems")
    for name, desc in AI_AGENTS:
        add_bullet(doc, desc, bold_lead=name + " - ")

    # Key Achievements
    add_heading(doc, "Key Achievements")
    for item in data["achievements"]:
        add_bullet(doc, item)

    # Core Skills
    add_heading(doc, "Core Skills")
    for item in data["core_skills"]:
        add_bullet(doc, item)
    add_plain(doc, "Tools & Technology: " + data["tools"], size=9.5, italic=True, space_after=6)

    # Certifications
    add_heading(doc, "Certifications")
    for name, issuer in data["certs"]:
        add_bullet(doc, issuer, bold_lead=name + " - ")

    # Education
    add_heading(doc, "Education")
    deg, school, spec = EDUCATION
    add_plain(doc, deg, bold=True, size=10.5, space_after=0)
    add_plain(doc, school, size=9.5, space_after=0)
    add_plain(doc, spec, size=9.5, italic=True, space_after=6)

    # Open to
    add_heading(doc, "Open to Opportunities")
    add_plain(doc, data["open_to"], size=10, space_after=0)

    out_path = os.path.join(OUT_DIR, data["filename"])
    doc.save(out_path)
    print("Saved:", out_path)


if __name__ == "__main__":
    for key, data in ROLES.items():
        build_resume(key, data)
