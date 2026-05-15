from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "deism-theism-gradient-audit-curriculum.pdf"
CLAIMS = ROOT / "public" / "claims.json"

OLIVE = colors.HexColor("#66752c")
DARK_OLIVE = colors.HexColor("#2f3917")
PALE_OLIVE = colors.HexColor("#eef2dc")
MIST = colors.HexColor("#f7f8f1")
INK = colors.HexColor("#111111")
TEXT = colors.HexColor("#3f3f3f")
MUTED = colors.HexColor("#697060")
LINE = colors.HexColor("#c8d0b6")
WHITE = colors.white


def clean(value: str) -> str:
    replacements = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u00a0": " ",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return value


def p(text: str, style: ParagraphStyle | None = None) -> Paragraph:
    return Paragraph(clean(text), style or STYLES["Body"])


def section(title: str, kicker: str | None = None) -> list:
    flowables = []
    if kicker:
        flowables.append(p(kicker.upper(), STYLES["Kicker"]))
    flowables.append(p(title, STYLES["H1"]))
    flowables.append(Spacer(1, 0.12 * inch))
    return flowables


def subhead(title: str) -> Paragraph:
    return p(title, STYLES["H2"])


def smallhead(title: str) -> Paragraph:
    return p(title, STYLES["H3"])


def bullets(items: list[str], width: float = 6.55 * inch, style_name: str = "BulletBody") -> Table:
    rows = [[p(f"- {item}", STYLES[style_name])] for item in items]
    table = Table(rows, colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def numbered(items: list[str], width: float = 6.55 * inch) -> Table:
    rows = [[p(f"{index + 1}. {item}", STYLES["BulletBody"])] for index, item in enumerate(items)]
    table = Table(rows, colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def callout(title: str, body: str) -> Table:
    table = Table(
        [[p(title, STYLES["CalloutTitle"])], [p(body, STYLES["CalloutBody"])]],
        colWidths=[6.55 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_OLIVE),
                ("BOX", (0, 0), (-1, -1), 1.0, OLIVE),
                ("LINEBELOW", (0, 0), (-1, 0), 0.55, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def data_table(rows: list[list], widths: list[float], header: bool = True) -> Table:
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    style = [
        ("BOX", (0, 0), (-1, -1), 0.65, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    if header:
        style.extend(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK_OLIVE),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ]
        )
    table.setStyle(TableStyle(style))
    return table


def card_grid(cards: list[tuple[str, str]]) -> Table:
    rows = []
    for index in range(0, len(cards), 2):
        row = []
        for title, body in cards[index : index + 2]:
            row.append([p(title, STYLES["CardTitle"]), Spacer(1, 0.04 * inch), p(body, STYLES["Small"])])
        if len(row) == 1:
            row.append("")
        rows.append(row)
    table = Table(rows, colWidths=[3.18 * inch, 3.18 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), MIST),
                ("LEFTPADDING", (0, 0), (-1, -1), 11),
                ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def footer(canvas, doc):
    canvas.saveState()
    width, _height = letter
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(0.72 * inch, 0.58 * inch, width - 0.72 * inch, 0.58 * inch)
    canvas.setFont("Helvetica-Bold", 7.4)
    canvas.setFillColor(DARK_OLIVE)
    canvas.drawString(0.72 * inch, 0.39 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 7.4)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(width / 2, 0.39 * inch, "Deism-Theism Gradient Audit Curriculum")
    canvas.drawRightString(width - 0.72 * inch, 0.39 * inch, str(doc.page))
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(MIST)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(DARK_OLIVE)
    canvas.rect(0, height - 1.0 * inch, width, 1.0 * inch, stroke=0, fill=1)
    canvas.setFillColor(OLIVE)
    canvas.rect(0, 0, 0.45 * inch, height, stroke=0, fill=1)

    canvas.setStrokeColor(OLIVE)
    canvas.setLineWidth(1.1)
    for offset in [0, 0.24 * inch, 0.48 * inch, 0.72 * inch]:
        canvas.line(width - 2.25 * inch + offset, 1.14 * inch, width - 0.55 * inch + offset, 2.8 * inch)
        canvas.line(width - 0.65 * inch - offset, 1.22 * inch, width - 2.3 * inch - offset, 2.7 * inch)

    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 53)
    canvas.drawString(0.9 * inch, 7.1 * inch, "Deism-")
    canvas.drawString(0.9 * inch, 6.45 * inch, "Theism")
    canvas.drawString(0.9 * inch, 5.8 * inch, "Gradient")
    canvas.drawString(0.9 * inch, 5.15 * inch, "Curriculum")

    canvas.setFillColor(DARK_OLIVE)
    canvas.setFont("Helvetica-Bold", 18.5)
    canvas.drawString(0.93 * inch, 4.55 * inch, "A 12-session course for young, honest seekers")

    canvas.setFillColor(TEXT)
    canvas.setFont("Helvetica", 12.6)
    intro = [
        "A teacher-ready curriculum for small groups learning to map",
        "Christian claims with courage, charity, proportion, and rigor.",
        "Built around Confidence, Personal Substantiation, bridge",
        "premises, dependency tension, and belief repair.",
    ]
    y = 4.08 * inch
    for line in intro:
        canvas.drawString(0.94 * inch, y, line)
        y -= 0.22 * inch

    canvas.setFillColor(WHITE)
    canvas.roundRect(0.94 * inch, 1.2 * inch, 3.8 * inch, 0.56 * inch, 8, stroke=0, fill=1)
    canvas.setFillColor(DARK_OLIVE)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(1.12 * inch, 1.39 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 9.4)
    canvas.drawRightString(4.48 * inch, 1.39 * inch, "xhairs.com")
    canvas.restoreState()


def contents(story):
    story.extend(section("Contents", "Curriculum map"))
    rows = [
        ("1", "Course identity and learning aims"),
        ("2", "The teacher's stance"),
        ("3", "Course architecture and pacing"),
        ("4", "Core concepts students must master"),
        ("5", "Assessment, safety, and group culture"),
        ("6", "Materials and room design"),
        ("7", "The 12-session scope and sequence"),
        ("8", "Session plans"),
        ("Appendix A", "Student worksheets"),
        ("Appendix B", "Facilitator prompts and Socratic moves"),
        ("Appendix C", "Rubrics and final portfolio"),
        ("Appendix D", "The 50-claim architecture"),
    ]
    table = Table([[p(num, STYLES["TocNum"]), p(title, STYLES["TocText"])] for num, title in rows], colWidths=[1.0 * inch, 5.35 * inch])
    table.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 0.18 * inch))
    story.append(
        callout(
            "Design standard",
            "This curriculum is built for a dynamic teacher who can hold rigor and warmth together. The goal is not to manufacture certainty. The goal is to help students become clearer, fairer, and more responsible with belief.",
        )
    )


def opening_framework(story):
    story.append(PageBreak())
    story.extend(section("Course Identity and Learning Aims", "1"))
    story.append(
        p(
            "This curriculum teaches the core contents of the Deism-Theism Gradient Audit to a small group of young, honest seekers. It assumes students may include sincere Christians, uncertain Christians, doubters, deists, agnostics, and intellectually serious skeptics. The classroom posture is neither apologetics combat nor deconversion theater. It is disciplined self-examination."
        )
    )
    story.append(
        p(
            "The course treats Christianity as a layered web of claims. Some claims are thin, such as the claim that the universe has an explanation beyond its internal events. Other claims are thick, such as the claim that the Christian God personally acts through Christ and the Spirit to save, guide, heal, and transform human beings. Students learn to ask what kind of support each layer requires."
        )
    )
    story.append(
        card_grid(
            [
                ("Core aim", "Students learn to distinguish what they believe, why they believe it, how strongly they believe it, and where their web of beliefs carries unresolved tension."),
                ("Audience", "Small groups of 6-12 older teens, college students, or young adults who are mature enough for honest religious and philosophical reflection."),
                ("Tone", "Warm, searching, rigorous, non-coercive, and emotionally safe without becoming intellectually soft."),
                ("Final product", "Each student leaves with a Personal Belief Audit Portfolio: scores, notes, revised claims, bridge premises, tensions, and a next-study plan."),
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("Learning outcomes"))
    story.append(
        bullets(
            [
                "Separate Confidence from Personal Substantiation in religious and nonreligious claims.",
                "Explain the five-band deism-to-Christian-theism gradient and why claims thicken across it.",
                "Identify bridge premises required to move from broad source claims to specific Christian claims.",
                "Recognize dependency tension when downstream claims outrun their prerequisite claims.",
                "Evaluate testimony, experience, scripture, inference, tradition, community trust, and rival explanations without flattening them into one category.",
                "Revise overstrong claims into more modest, better-supported claims without caricaturing Christianity or skepticism.",
                "Produce a final belief map that names current convictions, doubts, delegated trust, personal evidence, and next questions.",
            ]
        )
    )
    story.append(
        callout(
            "Course refrain",
            "This is not a loyalty test. It is a clarity exercise. Honest uncertainty is not failure; dishonest certainty is not faithfulness.",
        )
    )

    story.append(PageBreak())
    story.extend(section("The Teacher's Stance", "2"))
    story.append(
        p(
            "The teacher is dynamic and creative, but the performance serves the students' clarity. The best facilitator can make the room feel alive while refusing to manipulate students toward a predetermined score. The teacher protects both intellectual seriousness and personal vulnerability."
        )
    )
    teacher_rows = [
        [p("Virtue", STYLES["TableHeader"]), p("Teacher behavior", STYLES["TableHeader"]), p("Classroom danger it resists", STYLES["TableHeader"])],
        [p("Courage", STYLES["TableCellBold"]), p("Welcomes difficult questions without rushing to close them.", STYLES["TableCell"]), p("Fear-based agreement or performative doubt.", STYLES["TableCell"])],
        [p("Charity", STYLES["TableCellBold"]), p("States Christian and skeptical views in forms their best advocates would recognize.", STYLES["TableCell"]), p("Caricature, dunking, and tribal shortcuts.", STYLES["TableCell"])],
        [p("Proportion", STYLES["TableCellBold"]), p("Asks whether confidence is scaled to available support.", STYLES["TableCell"]), p("Inflated certainty and false precision.", STYLES["TableCell"])],
        [p("Integration", STYLES["TableCellBold"]), p("Helps students see how claims depend on each other.", STYLES["TableCell"]), p("Disconnected slogans that never meet their prerequisites.", STYLES["TableCell"])],
    ]
    story.append(data_table(teacher_rows, [1.15 * inch, 2.85 * inch, 2.55 * inch]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("Facilitator commitments"))
    story.append(
        bullets(
            [
                "Do not shame students for low scores, high scores, doubt, faith, emotion, or confusion.",
                "Do not let vague claims hide from follow-up questions.",
                "Do not treat the tool's scores as verdicts about truth, spirituality, or moral worth.",
                "Do ask repeatedly: what exactly would need to be true for this stronger claim to be responsibly held?",
                "Do model revision. Let students watch an adult make a claim more modest without embarrassment.",
            ]
        )
    )

    story.append(PageBreak())
    story.extend(section("Course Architecture and Pacing", "3"))
    story.append(
        p(
            "The standard version is twelve sessions of 75-100 minutes. A strong rhythm is 90 minutes: opening prompt, concept teaching, active lab, reflective debrief, and a small assignment. The course can also be compressed into an eight-week format or expanded into a semester with reading and student presentations."
        )
    )
    pacing_rows = [
        [p("Format", STYLES["TableHeader"]), p("Best use", STYLES["TableHeader"]), p("Adjustment", STYLES["TableHeader"])],
        [p("12 sessions", STYLES["TableCellBold"]), p("Best default for small groups.", STYLES["TableCell"]), p("Use every session plan as written.", STYLES["TableCell"])],
        [p("8 sessions", STYLES["TableCellBold"]), p("Short-term group or school module.", STYLES["TableCell"]), p("Combine sessions 5-6, 7-8, and 10-11; keep final portfolio.", STYLES["TableCell"])],
        [p("Weekend retreat", STYLES["TableCellBold"]), p("Immersive workshop for motivated students.", STYLES["TableCell"]), p("Teach concepts briefly; spend most time in labs and portfolio work.", STYLES["TableCell"])],
        [p("Semester", STYLES["TableCellBold"]), p("Classroom, campus ministry, or reading group.", STYLES["TableCell"]), p("Add readings, student-led case studies, and peer portfolio review.", STYLES["TableCell"])],
    ]
    story.append(data_table(pacing_rows, [1.2 * inch, 2.55 * inch, 2.8 * inch]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("Repeated session rhythm"))
    story.append(
        numbered(
            [
                "Opening temperature check: one honest sentence or anonymous index card.",
                "Concept input: a short, vivid explanation of one core distinction.",
                "Active lab: students sort, rate, map, question, or revise claims.",
                "Socratic debrief: students name what became clearer or harder.",
                "Portfolio move: each student records one score, note, bridge premise, or revised claim.",
            ]
        )
    )

    story.append(PageBreak())
    story.extend(section("Core Concepts Students Must Master", "4"))
    concept_rows = [
        [p("Concept", STYLES["TableHeader"]), p("Student-friendly definition", STYLES["TableHeader"]), p("Mastery evidence", STYLES["TableHeader"])],
        [p("Confidence", STYLES["TableCellBold"]), p("How credible the claim currently seems to me.", STYLES["TableCell"]), p("Student can rate a claim without turning the score into an identity badge.", STYLES["TableCell"])],
        [p("Personal Substantiation", STYLES["TableCellBold"]), p("How well I can personally explain, defend, qualify, and revise the claim under fair questioning.", STYLES["TableCell"]), p("Student can distinguish personal mastery from borrowed trust.", STYLES["TableCell"])],
        [p("Gradient", STYLES["TableCellBold"]), p("A sequence from broad source claims to thick Christian claims.", STYLES["TableCell"]), p("Student can locate a claim in one of the five bands.", STYLES["TableCell"])],
        [p("Bridge Premise", STYLES["TableCellBold"]), p("A premise that licenses movement from a thinner claim to a thicker one.", STYLES["TableCell"]), p("Student can write the missing premise between two claims.", STYLES["TableCell"])],
        [p("Dependency Tension", STYLES["TableCellBold"]), p("Pressure created when a downstream claim is rated higher than the claims it depends on.", STYLES["TableCell"]), p("Student can identify which upstream claim needs repair.", STYLES["TableCell"])],
        [p("Rival Explanation", STYLES["TableCellBold"]), p("A competing account of the same data or experience.", STYLES["TableCell"]), p("Student can name a non-dismissive alternative without pretending it wins automatically.", STYLES["TableCell"])],
        [p("Modest Repair", STYLES["TableCellBold"]), p("Restating a claim at the strength the evidence can actually carry.", STYLES["TableCell"]), p("Student can revise an overstrong claim without making it trivial.", STYLES["TableCell"])],
    ]
    story.append(data_table(concept_rows, [1.45 * inch, 2.65 * inch, 2.45 * inch]))
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        callout(
            "The central distinction",
            "A student may say: I still believe this, but I now see that my Personal Substantiation is lower than my Confidence. That sentence is not a defeat. It is intellectual honesty becoming audible.",
        )
    )

    story.append(PageBreak())
    story.extend(section("Assessment, Safety, and Group Culture", "5"))
    story.append(
        p(
            "Assessment should reward honesty, precision, charity, and growth rather than apologetic performance. Students should never be graded for becoming more Christian, less Christian, more skeptical, or less skeptical. They can be assessed on whether they use the tool's distinctions responsibly."
        )
    )
    story.append(subhead("Group covenant"))
    story.append(
        bullets(
            [
                "We will not weaponize another person's scores.",
                "We will not confuse emotional intensity with evidence.",
                "We will not treat private experience as worthless or as automatically public proof.",
                "We will state opposing views in strong, fair terms before criticizing them.",
                "We will allow claims to become more modest when the evidence requires it.",
                "We will keep personal disclosures confidential unless someone is unsafe.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("Assessment artifacts"))
    story.append(
        card_grid(
            [
                ("Concept checks", "Short written explanations of Confidence, Personal Substantiation, bridge premises, and dependency tension."),
                ("Lab worksheets", "Evidence grids, claim-sorting sheets, rival-explanation sheets, and dependency maps."),
                ("Portfolio notes", "Personal scores, caveats, revisions, and questions gathered across the course."),
                ("Final map", "A concise public presentation of what the student can share without exposing private scores."),
            ]
        )
    )

    story.append(PageBreak())
    story.extend(section("Materials and Room Design", "6"))
    story.append(subhead("Physical materials"))
    story.append(
        bullets(
            [
                "Printed 50-claim deck, preferably color-coded by the five gradient bands.",
                "Large five-band wall chart or floor line from Minimal Deism to Specific Christian Theism.",
                "Two-slider rating sheets for students who need paper before using the app.",
                "Bridge premise cards: because, therefore, unless, rival explanation, defeater, scope limit.",
                "Private journals or folders for each student's audit portfolio.",
                "Sticky notes in two colors: one for confidence, one for personal substantiation.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(subhead("Digital materials"))
    story.append(
        bullets(
            [
                "The Deism-Theism Gradient Audit app.",
                "The manual PDF for individual reference.",
                "The curriculum PDF for teachers and group leaders.",
                "Export/import JSON backups for students who want to preserve their work.",
                "Optional AI prompt use for students ready for second-stage Socratic review.",
            ]
        )
    )
    story.append(
        callout(
            "Room design principle",
            "Make movement visible. Students should physically move claims, bridge cards, and rival explanations. The course lands better when belief becomes a map students can walk around.",
        )
    )


SESSIONS = [
    {
        "n": 1,
        "title": "The Honest Seeker's Posture",
        "question": "How can we inspect belief without panic, shame, or performative certainty?",
        "concepts": ["intellectual humility", "motivated reasoning", "fear of doubt", "clarity versus loyalty"],
        "targets": [
            "Students can explain why the audit is a mirror rather than a verdict.",
            "Students can name one fear that distorts belief assessment.",
            "Students can practice asking a hard question without turning it into an accusation.",
        ],
        "plan": [
            "0-10: Silent card prompt: one question I am afraid to ask about Christianity.",
            "10-25: Teacher frames the four virtues: courage, charity, proportion, integration.",
            "25-45: Group covenant construction. Students convert vague norms into observable behaviors.",
            "45-65: Mini-lab: compare three postures toward doubt - avoidance, attack, and inquiry.",
            "65-82: Portfolio start: write a private baseline paragraph titled What I hope this course will clarify.",
            "82-90: Closing sentence round: clarity I want, pressure I feel, or question I am carrying.",
        ],
        "activity": "Fear-to-question alchemy. Students rewrite an emotionally loaded doubt into a precise question that could be investigated.",
        "teacher": "Normalize ambiguity while refusing vagueness. Say often: the question is welcome; now let's make it precise enough to examine.",
        "assignment": "Write three claims you currently hold with different levels of confidence: one strong, one uncertain, one inherited.",
        "artifact": "Group covenant plus personal baseline reflection.",
    },
    {
        "n": 2,
        "title": "Confidence vs. Personal Substantiation",
        "question": "What is the difference between believing a claim and being able to personally carry its case?",
        "concepts": ["Confidence", "Personal Substantiation", "delegated trust", "substantiation gap"],
        "targets": [
            "Students can define C and P in their own words.",
            "Students can rate nonreligious sample claims on both sliders.",
            "Students can describe when delegated trust is reasonable and when it is being hidden.",
        ],
        "plan": [
            "0-8: Warm-up: rate three harmless claims on Confidence only.",
            "8-25: Introduce the second slider: Personal Substantiation.",
            "25-45: Two-slider practice with everyday claims: nutrition, history, medicine, family memory.",
            "45-65: Transfer to religious claims: God answers prayer, scripture conveys truth, Jesus rose.",
            "65-80: Discuss trust without pretense: experts, pastors, parents, tradition, memory.",
            "80-90: Portfolio move: choose one claim where C is higher than P and write why.",
        ],
        "activity": "The borrowed-case test. Students mark which parts of their reasons are personally understood and which are borrowed from another authority.",
        "teacher": "Keep low P from feeling humiliating. The point is not to despise trust; it is to label trust accurately.",
        "assignment": "Bring one claim next week that you believe largely by personal experience, and one largely by testimony.",
        "artifact": "Two-slider worksheet with at least five scored claims.",
    },
    {
        "n": 3,
        "title": "The Five-Band Gradient",
        "question": "How do Christian claims thicken as they move from source claims to specifically Christian divine-action claims?",
        "concepts": ["Minimal Deism", "Design Deism", "Personal Theism", "Interventionist Theism", "Specific Christian Theism"],
        "targets": [
            "Students can place claims into the five gradient bands.",
            "Students can explain why psychological order and logical support order can differ.",
            "Students can identify which band a claim belongs to without treating all God-claims as equivalent.",
        ],
        "plan": [
            "0-10: Physical line on the floor: students stand where they think a sample claim belongs.",
            "10-25: Teach the five bands with one vivid example each.",
            "25-55: Claim-sort lab using selected cards from the 50-claim deck.",
            "55-72: Debate ambiguous cards: prayer, morality, creation, resurrection, healing.",
            "72-85: Introduce the idea of a bridge between bands.",
            "85-90: Exit ticket: one claim is thinner than I thought; one claim is thicker than I thought.",
        ],
        "activity": "Human gradient. Students physically move across the room as claims become more specific.",
        "teacher": "Use movement and humor, but require reasons. The student must say what makes the claim thinner or thicker.",
        "assignment": "Choose three claims from different bands and write what evidence would be relevant to each.",
        "artifact": "Sorted claim deck and personal band notes.",
    },
    {
        "n": 4,
        "title": "Evidence Types and Their Limits",
        "question": "What kinds of support can different kinds of Christian claims responsibly use?",
        "concepts": ["argument", "testimony", "experience", "scripture", "community trust", "rival explanation"],
        "targets": [
            "Students can distinguish evidence types without reducing them to one hierarchy.",
            "Students can name what each evidence type can and cannot support.",
            "Students can identify when evidence is being asked to do too much.",
        ],
        "plan": [
            "0-10: Evidence inventory: students list reasons people believe Christian claims.",
            "10-25: Teach evidence types and their normal strengths and limits.",
            "25-55: Evidence lab. Groups receive one claim and build a support map.",
            "55-72: Rival explanation pass. Another group names alternate accounts.",
            "72-84: Repair pass. Original group restates the claim at a better-supported level.",
            "84-90: Portfolio note: one evidence type I overuse or undervalue.",
        ],
        "activity": "Evidence toolbench. Each group must label whether a reason is direct support, background support, testimony, experience, inference, or community trust.",
        "teacher": "Prevent cheap skepticism and cheap assurance. Make every team state the strongest version of the other side.",
        "assignment": "Write a one-page evidence map for one personal claim from your portfolio.",
        "artifact": "Evidence grid plus rival-explanation notes.",
    },
    {
        "n": 5,
        "title": "Minimal and Design Deism",
        "question": "What licenses movement from explanation to purpose or design?",
        "concepts": ["contingency", "cosmological explanation", "fine-tuning", "purpose", "scope control"],
        "targets": [
            "Students can distinguish a source claim from a design claim.",
            "Students can write a bridge premise between Minimal Deism and Design Deism.",
            "Students can identify rival accounts without pretending the topic is simple.",
        ],
        "plan": [
            "0-12: Claim contrast: the universe has an explanation versus the universe reflects purpose.",
            "12-30: Teach how broad explanatory claims can be thinner than design claims.",
            "30-55: Bridge premise clinic: students write the missing premise.",
            "55-72: Rival explanation round: brute fact, multiverse, necessity, unknown physics, design.",
            "72-84: Modest repair: rewrite an overconfident design claim.",
            "84-90: Exit ticket: what would need to be true for the stronger claim?",
        ],
        "activity": "Bridge card chain. Students build a chain from C1 to a design claim, then mark which links are strong, weak, or assumed.",
        "teacher": "Keep the class from rushing to God-language before the bridge has been named.",
        "assignment": "Use the app to rate the Minimal Deism and Design Deism categories; add notes to two claims.",
        "artifact": "Bridge premise worksheet for bands 1 to 2.",
    },
    {
        "n": 6,
        "title": "Personal Theism",
        "question": "What would justify treating the source of reality as a personal agent rather than an impersonal explanation?",
        "concepts": ["agency", "mind", "moral concern", "communication", "personal God"],
        "targets": [
            "Students can compare source, designer, and personal agent claims.",
            "Students can name evidence that would support or weaken personal theism.",
            "Students can spot when personality is imported without argument.",
        ],
        "plan": [
            "0-10: Three chairs: source, designer, personal agent. Students assign sample claims.",
            "10-28: Teach the difference between explanation, intention, and relationship.",
            "28-52: Agency lab: what signs distinguish agency from pattern or projection?",
            "52-70: Moral concern and communication: what would count as support?",
            "70-84: App work: rate Personal Theism claims and inspect gaps.",
            "84-90: Portfolio note: where do I infer personhood, and why?",
        ],
        "activity": "Agency detective. Students compare cases of accident, pattern, animal agency, human agency, and alleged divine agency.",
        "teacher": "Invite imagination, then demand criteria. Students need more than vibes and more than dismissal.",
        "assignment": "Write the strongest bridge premise you can for moving from design to personal agency.",
        "artifact": "Agency criteria sheet.",
    },
    {
        "n": 7,
        "title": "Interventionist Theism",
        "question": "When are claims about divine action more than coincidence, suggestion, social reinforcement, or retrospective interpretation?",
        "concepts": ["healing", "answered prayer", "guidance", "foreknowledge", "spiritual gifts", "discernment"],
        "targets": [
            "Students can distinguish possibility, plausibility, personal persuasiveness, and public substantiation.",
            "Students can evaluate miracle and guidance claims without mockery or gullibility.",
            "Students can name what evidence would raise or lower confidence responsibly.",
        ],
        "plan": [
            "0-10: Four labels on the wall: possible, plausible, personally persuasive, publicly substantiated.",
            "10-25: Teach why divine-action claims require careful criteria.",
            "25-60: Case-study court: healing, guidance, or answered prayer.",
            "60-75: Judges ask what would count as confirmation, coincidence, or defeater.",
            "75-85: App work: rate Interventionist Theism claims and add notes.",
            "85-90: Exit sentence: one claim I can make more carefully now.",
        ],
        "activity": "Case-study court. Teams argue for divine action, rival explanation, and careful judgment.",
        "teacher": "Keep testimonies protected but claims inspectable. A student's story deserves care; a public claim still needs criteria.",
        "assignment": "Prepare a brief analysis of one divine-action claim using support, rival explanation, and scope limit.",
        "artifact": "Divine-action evaluation sheet.",
    },
    {
        "n": 8,
        "title": "Specific Christian Theism",
        "question": "What extra support is needed for specifically Christian claims about Jesus, scripture, salvation, the Spirit, and the church?",
        "concepts": ["revelation", "scripture", "resurrection", "salvation", "Holy Spirit", "Christian specificity"],
        "targets": [
            "Students can distinguish generic theism from Christian theism.",
            "Students can identify which Christian claims depend on earlier bands.",
            "Students can write modest versions of Christian claims that preserve seriousness without overstatement.",
        ],
        "plan": [
            "0-12: Thin-to-thick ladder: God exists, God is personal, God acts, Jesus reveals God.",
            "12-30: Teach specificity inflation and why stronger claims need added support.",
            "30-55: Dependency map: connect Specific Christian Theism claims to prerequisites.",
            "55-72: Scripture and resurrection mini-lab: what evidence is doing what work?",
            "72-84: App work: rate Specific Christian Theism claims.",
            "84-90: Portfolio note: one Christian claim I hold strongly, and what it depends on.",
        ],
        "activity": "Specificity audit. Students mark which parts of a claim are generic theism and which are distinctively Christian.",
        "teacher": "Be fair to Christian tradition without allowing tradition to erase the need for bridge premises.",
        "assignment": "Choose one specific Christian claim and write its dependency chain.",
        "artifact": "Specificity and dependency worksheet.",
    },
    {
        "n": 9,
        "title": "Dependency Tension and Belief Repair",
        "question": "What do we do when a downstream belief is stronger than the beliefs that support it?",
        "concepts": ["dependency tension", "upstream support", "modest repair", "scope limits", "bridge repair"],
        "targets": [
            "Students can identify a high-pressure claim in their own profile.",
            "Students can decide whether to lower Confidence, raise Personal Substantiation, or revise wording.",
            "Students can write a repaired claim that is neither evasive nor inflated.",
        ],
        "plan": [
            "0-10: Teacher models a repaired claim using a nonreligious example.",
            "10-25: Teach three repair paths: lower C, raise P, or revise the claim.",
            "25-55: Students inspect their app alerts or paper maps for dependency tension.",
            "55-72: Peer clinic: one student reads only the claim and bridge, not private scores.",
            "72-84: Rewrite three claims: stronger, weaker, and more precise.",
            "84-90: Exit ticket: the repair that would most reduce my current tension.",
        ],
        "activity": "Claim repair workshop. Students turn inflated claims into defensible claims while preserving what evidence can still support.",
        "teacher": "Praise precision over victory. The best repair is often quieter and stronger.",
        "assignment": "Complete a three-claim repair sheet for your portfolio.",
        "artifact": "High-pressure claim repair sheet.",
    },
    {
        "n": 10,
        "title": "Running the Full Audit",
        "question": "What does my current belief map look like when I rate all 50 claims honestly?",
        "concepts": ["full profile", "category profile", "claim scatter", "substantiation gap", "notes"],
        "targets": [
            "Students can complete the 50-claim audit privately.",
            "Students can interpret dashboard patterns without treating them as grades.",
            "Students can export or preserve their profile responsibly.",
        ],
        "plan": [
            "0-8: Quiet setup and reminder of privacy norms.",
            "8-55: Silent full-audit work. Teacher circulates for technical help only.",
            "55-70: Dashboard reading: what patterns appear, without public disclosure.",
            "70-82: Students write top five confidence claims and top five high-gap claims.",
            "82-90: Optional pair share: one pattern I noticed, one question I want to study.",
        ],
        "activity": "Silent audit studio. The room becomes focused and private; students work at their own pace.",
        "teacher": "Do not hover over scores. Protect privacy and make the room feel calm.",
        "assignment": "Finish any unrated claims and export your profile or write a summary if working on paper.",
        "artifact": "Completed audit profile or paper equivalent.",
    },
    {
        "n": 11,
        "title": "Socratic Review and AI Prompt Analysis",
        "question": "How can a second-stage review sharpen my questions without outsourcing my judgment?",
        "concepts": ["Socratic audit", "AI prompt", "top tensions", "follow-up questions", "repair options"],
        "targets": [
            "Students can use the final report or AI prompt as a disciplined review aid.",
            "Students can identify their top three tensions.",
            "Students can ask targeted follow-up questions instead of seeking reassurance.",
        ],
        "plan": [
            "0-12: Teach the difference between reassurance prompts and audit prompts.",
            "12-30: Read sample AI prompt structure from the app and identify its rigor.",
            "30-55: Students generate or draft their own Socratic review prompt.",
            "55-75: Manual or AI-assisted review: top tensions, differentiators, repair options.",
            "75-86: Portfolio move: write one question that would genuinely change your view.",
            "86-90: Closing: what I need next is not an answer but a better investigation.",
        ],
        "activity": "Prompt surgery. Students improve weak prompts by adding data, tension, required format, and anti-flattery instructions.",
        "teacher": "Treat AI as a mirror with limitations, not an oracle. Require students to judge the output.",
        "assignment": "Create your final portfolio draft: claims, tensions, bridge premises, revised claims, next study plan.",
        "artifact": "Socratic review output or manual equivalent.",
    },
    {
        "n": 12,
        "title": "Final Belief Map and Next Study Plan",
        "question": "What can I honestly say now, and what should I study next?",
        "concepts": ["belief map", "open questions", "integrated reflection", "next study plan"],
        "targets": [
            "Students can present a non-coercive summary of their current map.",
            "Students can distinguish private scores from public reflection.",
            "Students can name next steps for study, conversation, and practice.",
        ],
        "plan": [
            "0-10: Set presentation norms: no one has to reveal private numbers.",
            "10-60: Student presentations: current map, strongest claim, top tension, repaired claim, next question.",
            "60-75: Group affirmation: clarity noticed, courage witnessed, question worth pursuing.",
            "75-84: Final reflection: how my understanding of belief changed.",
            "84-90: Closing ritual: one sentence of courage, charity, proportion, or integration.",
        ],
        "activity": "Belief map gallery. Students display selected nonprivate artifacts: a bridge premise, a revised claim, an open question, or a study plan.",
        "teacher": "Honor movement without demanding a dramatic story. Quiet clarity is a serious outcome.",
        "assignment": "Optional follow-up: repeat the audit in three months and compare the profile.",
        "artifact": "Personal Belief Audit Portfolio.",
    },
]


def scope_sequence(story):
    story.append(PageBreak())
    story.extend(section("The 12-Session Scope and Sequence", "7"))
    rows = [[p("Session", STYLES["TableHeader"]), p("Focus", STYLES["TableHeader"]), p("Primary artifact", STYLES["TableHeader"])]]
    for session in SESSIONS:
        rows.append(
            [
                p(str(session["n"]), STYLES["TableCellBold"]),
                p(f"<b>{session['title']}</b><br/>{session['question']}", STYLES["TableCell"]),
                p(session["artifact"], STYLES["TableCell"]),
            ]
        )
    story.append(data_table(rows, [0.65 * inch, 4.05 * inch, 1.85 * inch]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        callout(
            "The teacher's recurring question",
            "What exactly would need to be true for this stronger claim to be responsibly held?",
        )
    )


def session_plans(story):
    story.append(PageBreak())
    story.extend(section("Session Plans", "8"))
    story.append(
        p(
            "Each session below is written for 90 minutes. For a 75-minute group, shorten the opening prompt and closing round. For a 100-minute group, expand the lab and give students more time to write portfolio notes."
        )
    )
    story.append(
        card_grid(
            [
                ("Before the room opens", "Choose the claims, print or load the worksheets, decide what must remain private, and prepare one example you are willing to revise in front of the group."),
                ("During the lab", "Let students move, sort, write, and argue, but keep asking for definitions, bridge premises, rival explanations, and scope limits."),
                ("During the debrief", "Ask for patterns rather than private scores. Students can share a claim, a question, a repair, or a tension without exposing their full profile."),
                ("After the session", "Have students add one artifact to the portfolio. The course works because every meeting leaves a trace."),
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        callout(
            "Adaptation rule",
            "If time runs short, protect the active lab and portfolio move. Shorten lecture first. The curriculum teaches best when students practice the distinction rather than merely hear it explained.",
        )
    )
    for session in SESSIONS:
        story.append(PageBreak())
        story.extend(section(session["title"], f"Session {session['n']}"))
        story.append(callout("Essential question", session["question"]))
        story.append(Spacer(1, 0.12 * inch))
        story.append(
            data_table(
                [
                    [p("Core concepts", STYLES["TableHeader"]), p("Learning targets", STYLES["TableHeader"])],
                    [
                        bullets(session["concepts"], width=2.28 * inch, style_name="TinyBullet"),
                        bullets(session["targets"], width=4.0 * inch, style_name="TinyBullet"),
                    ],
                ],
                [2.45 * inch, 4.1 * inch],
            )
        )
        story.append(Spacer(1, 0.13 * inch))
        story.append(subhead("90-minute plan"))
        story.append(bullets(session["plan"]))
        story.append(Spacer(1, 0.12 * inch))
        story.append(
            card_grid(
                [
                    ("Signature activity", session["activity"]),
                    ("Teacher move", session["teacher"]),
                    ("Assignment", session["assignment"]),
                    ("Portfolio artifact", session["artifact"]),
                ]
            )
        )


def appendices(story, claims):
    story.append(PageBreak())
    story.extend(section("Appendix A: Student Worksheets", "Appendix A"))
    worksheets = [
        (
            "Two-Slider Rating Sheet",
            [
                "Claim: ________________________________________________",
                "Confidence: 0 10 20 30 40 50 60 70 80 90 100",
                "Personal Substantiation: 0 10 20 30 40 50 60 70 80 90 100",
                "What makes this seem credible?",
                "What can I personally explain?",
                "What am I borrowing from testimony, authority, community, or tradition?",
                "What would lower or raise either score?",
            ],
        ),
        (
            "Bridge Premise Worksheet",
            [
                "Thinner claim I accept: __________________________________",
                "Thicker claim I want to reach: ___________________________",
                "Missing bridge premise: _________________________________",
                "Independent support for the bridge:",
                "Possible rival explanations:",
                "Defeaters or scope limits:",
                "Repaired claim if the bridge remains weak:",
            ],
        ),
        (
            "Rival Explanation Lab",
            [
                "Claim or experience under review:",
                "Christian interpretation:",
                "Naturalistic or psychological interpretation:",
                "Community or social interpretation:",
                "Coincidence or selection-bias interpretation:",
                "What evidence would distinguish these accounts?",
                "Most charitable conclusion at this stage:",
            ],
        ),
        (
            "Dependency Map",
            [
                "Downstream claim:",
                "Prerequisite claims:",
                "Which prerequisite is weakest?",
                "Is the downstream confidence higher than its supports?",
                "Repair option: lower C, raise P, revise wording, or study bridge premise.",
                "Next action:",
            ],
        ),
    ]
    for title, prompts in worksheets:
        story.append(subhead(title))
        story.append(bullets(prompts))
        story.append(Spacer(1, 0.1 * inch))

    story.append(PageBreak())
    story.extend(section("Appendix B: Facilitator Prompts and Socratic Moves", "Appendix B"))
    prompt_cards = [
        ("Clarify", "What exactly is the claim? Which word is doing the most work? Is this a thin claim or a thick one?"),
        ("Scale", "What would a 30, 60, or 90 version of this confidence look like? What changes between those versions?"),
        ("Bridge", "What premise licenses the move from the earlier claim to the later claim? Is that premise independently supported?"),
        ("Rival", "What is the strongest rival explanation that a fair critic would offer? What would distinguish it from your interpretation?"),
        ("Scope", "Does the evidence support this whole claim, or only a narrower version? Where does the claim drift beyond its warrant?"),
        ("Repair", "Can you make the claim more modest while preserving the real evidence you have?"),
        ("Integrate", "If this claim changes, which other claims in your web of belief would feel pressure?"),
        ("Humanize", "What fear, hope, loyalty, or experience makes this claim emotionally important to you?"),
    ]
    story.append(card_grid(prompt_cards))
    story.append(Spacer(1, 0.16 * inch))
    story.append(subhead("When discussion heats up"))
    story.append(
        bullets(
            [
                "Slow the pace. Ask students to write before responding aloud.",
                "Separate the person from the claim: the student is not on trial; the claim is under review.",
                "Require steelmanning before critique.",
                "Let students pass on personal disclosure while still practicing the concept on a public example.",
                "Return to the two sliders when the conversation becomes too global.",
            ]
        )
    )

    story.append(PageBreak())
    story.extend(section("Appendix C: Rubrics and Final Portfolio", "Appendix C"))
    rubric_rows = [
        [p("Skill", STYLES["TableHeader"]), p("Emerging", STYLES["TableHeader"]), p("Developing", STYLES["TableHeader"]), p("Strong", STYLES["TableHeader"])],
        [p("C/P distinction", STYLES["TableCellBold"]), p("Uses the sliders as mood ratings.", STYLES["TableCell"]), p("Can define both but sometimes merges them.", STYLES["TableCell"]), p("Consistently separates belief-strength from personal defensibility.", STYLES["TableCell"])],
        [p("Bridge premises", STYLES["TableCellBold"]), p("Jumps between claims without naming the move.", STYLES["TableCell"]), p("Can identify some missing premises.", STYLES["TableCell"]), p("Writes clear, independently assessable bridge premises.", STYLES["TableCell"])],
        [p("Rival explanations", STYLES["TableCellBold"]), p("Dismisses rivals quickly.", STYLES["TableCell"]), p("Names rivals but weakly.", STYLES["TableCell"]), p("States rivals charitably and tests what would distinguish them.", STYLES["TableCell"])],
        [p("Claim repair", STYLES["TableCellBold"]), p("Equates repair with surrender.", STYLES["TableCell"]), p("Can soften claims but loses precision.", STYLES["TableCell"]), p("Rewrites claims modestly while preserving meaningful content.", STYLES["TableCell"])],
    ]
    story.append(data_table(rubric_rows, [1.25 * inch, 1.75 * inch, 1.75 * inch, 1.8 * inch]))
    story.append(Spacer(1, 0.16 * inch))
    story.append(subhead("Final portfolio checklist"))
    story.append(
        bullets(
            [
                "Completed 50-claim profile or paper equivalent.",
                "Top five high-confidence claims with notes.",
                "Top five high-gap claims with notes.",
                "At least three bridge premises, including one weak bridge that needs study.",
                "At least three repaired claims.",
                "A fair rival explanation for one important claim.",
                "A one-page final reflection: what I currently affirm, doubt, need to study, and can state more modestly.",
                "A next-study plan with books, conversations, questions, practices, or research tasks.",
            ]
        )
    )

    story.append(PageBreak())
    story.extend(section("Appendix D: The 50-Claim Architecture", "Appendix D"))
    story.append(
        p(
            "Use the claim architecture as a teacher reference when building card decks, selecting examples, or assigning app work. The claims are grouped by gradient band."
        )
    )
    grouped = {}
    for claim in claims:
        grouped.setdefault(claim["category"], []).append(claim)
    for category, category_claims in grouped.items():
        story.append(Spacer(1, 0.12 * inch))
        story.append(subhead(category))
        rows = [[p("ID", STYLES["TableHeader"]), p("Claim", STYLES["TableHeader"])]]
        for claim in category_claims:
            rows.append([p(claim["id"], STYLES["TableCellBold"]), p(claim["text"], STYLES["TableCell"])])
        story.append(data_table(rows, [0.65 * inch, 5.9 * inch]))


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    claims = json.loads(CLAIMS.read_text())

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.76 * inch,
        bottomMargin=0.74 * inch,
        title="Deism-Theism Gradient Audit Curriculum",
        author="Phil Stilwell",
        subject="Curriculum for the Deism-Theism Gradient Audit",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=frame, onPage=cover),
            PageTemplate(id="body", frames=frame, onPage=footer),
        ]
    )

    story = []
    story.append(Spacer(1, 7.75 * inch))
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    contents(story)
    opening_framework(story)
    scope_sequence(story)
    session_plans(story)
    appendices(story, claims)
    doc.build(story)
    print(OUTPUT)


STYLES = getSampleStyleSheet()
STYLES.add(
    ParagraphStyle(
        name="Kicker",
        parent=STYLES["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=7.8,
        leading=9,
        textColor=OLIVE,
        spaceAfter=5,
    )
)
STYLES.add(
    ParagraphStyle(
        name="H1",
        parent=STYLES["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=27,
        textColor=INK,
        spaceAfter=2,
    )
)
STYLES.add(
    ParagraphStyle(
        name="H2",
        parent=STYLES["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13.5,
        leading=16,
        textColor=DARK_OLIVE,
        spaceBefore=9,
        spaceAfter=6,
    )
)
STYLES.add(
    ParagraphStyle(
        name="H3",
        parent=STYLES["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=11.2,
        leading=13,
        textColor=INK,
        spaceBefore=6,
        spaceAfter=4,
    )
)
STYLES.add(
    ParagraphStyle(
        name="Body",
        parent=STYLES["BodyText"],
        fontName="Helvetica",
        fontSize=9.8,
        leading=14.3,
        textColor=TEXT,
        spaceAfter=7,
    )
)
STYLES.add(
    ParagraphStyle(
        name="BulletBody",
        parent=STYLES["Body"],
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=3,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TinyBullet",
        parent=STYLES["Body"],
        fontSize=8.5,
        leading=11.4,
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=2,
    )
)
STYLES.add(
    ParagraphStyle(
        name="Small",
        parent=STYLES["Body"],
        fontSize=8.65,
        leading=11.8,
        textColor=TEXT,
        spaceAfter=4,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CardTitle",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=DARK_OLIVE,
        spaceAfter=2,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CalloutTitle",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=10.4,
        leading=13,
        textColor=DARK_OLIVE,
        spaceAfter=1,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CalloutBody",
        parent=STYLES["Body"],
        fontSize=9.2,
        leading=13.6,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableHeader",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=8.3,
        leading=10.5,
        textColor=WHITE,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableCell",
        parent=STYLES["Body"],
        fontSize=8.2,
        leading=10.6,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableCellBold",
        parent=STYLES["TableCell"],
        fontName="Helvetica-Bold",
        textColor=DARK_OLIVE,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TocNum",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=12,
        textColor=OLIVE,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TocText",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=TEXT,
        spaceAfter=0,
    )
)


if __name__ == "__main__":
    build_pdf()
