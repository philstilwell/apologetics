#!/usr/bin/env python3
"""Generate the Resurrection Evidence Audit user manual PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "manuals" / "resurrection-evidence-audit-manual.pdf"

FOREST = colors.HexColor("#103d26")
LEAF = colors.HexColor("#1f6b3d")
BRIGHT = colors.HexColor("#06da49")
BROWN = colors.HexColor("#8f5422")
CLAY = colors.HexColor("#97544d")
CREAM = colors.HexColor("#f7fbf4")
PALE_GREEN = colors.HexColor("#e8f3e8")
PALE_GOLD = colors.HexColor("#f2f5de")
INK = colors.HexColor("#102017")
MUTED = colors.HexColor("#435244")
BLACK = colors.HexColor("#050806")
SILVER = colors.HexColor("#ccd6cf")


def build_styles():
    base = getSampleStyleSheet()
    styles = {
        "Title": ParagraphStyle(
            "ManualTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=31,
            leading=34,
            textColor=FOREST,
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "Subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=13,
            leading=18,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=20,
        ),
        "H1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=FOREST,
            spaceBefore=14,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "H2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=BROWN,
            spaceBefore=10,
            spaceAfter=5,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=14,
            textColor=INK,
            spaceAfter=7,
        ),
        "Small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.5,
            textColor=MUTED,
            spaceAfter=4,
        ),
        "Bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=13,
            textColor=INK,
            leftIndent=14,
            bulletIndent=0,
            spaceAfter=4,
        ),
        "Quote": ParagraphStyle(
            "Quote",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=FOREST,
            alignment=TA_CENTER,
            spaceBefore=8,
            spaceAfter=8,
        ),
        "Tag": ParagraphStyle(
            "Tag",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=FOREST,
            alignment=TA_CENTER,
        ),
        "CellTitle": ParagraphStyle(
            "CellTitle",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=FOREST,
        ),
        "Cell": ParagraphStyle(
            "Cell",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.5,
            textColor=INK,
        ),
        "Footer": ParagraphStyle(
            "Footer",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=9,
            textColor=MUTED,
        ),
    }
    return styles


class CoverMark(Flowable):
    def __init__(self, width=1.65 * inch, height=1.65 * inch):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self):
        canvas = self.canv
        cx = self.width / 2
        cy = self.height / 2
        radius = min(self.width, self.height) * 0.38
        canvas.setFillColor(FOREST)
        canvas.circle(cx, cy, radius, stroke=0, fill=1)
        canvas.setStrokeColor(BROWN)
        canvas.setLineWidth(2)
        canvas.line(cx, cy - radius * 1.35, cx, cy + radius * 1.35)
        canvas.line(cx - radius * 1.35, cy, cx + radius * 1.35, cy)
        canvas.setFont("Helvetica-Bold", 24)
        canvas.setFillColor(colors.white)
        canvas.drawCentredString(cx, cy - 8, "X")


def p(text, style):
    return Paragraph(text, style)


def bullet_list(items, styles):
    return ListFlowable(
        [ListItem(p(item, styles["Body"]), leftIndent=12) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=16,
        bulletFontName="Helvetica-Bold",
        bulletColor=LEAF,
        bulletFontSize=7,
    )


def numbered_list(items, styles):
    return ListFlowable(
        [ListItem(p(item, styles["Body"]), leftIndent=14) for item in items],
        bulletType="1",
        leftIndent=18,
        bulletFontName="Helvetica-Bold",
        bulletColor=BROWN,
        bulletFontSize=8,
    )


def callout(title, body, styles, fill=PALE_GOLD, border=BROWN):
    table = Table(
        [
            [p(title, styles["CellTitle"])],
            [p(body, styles["Cell"])],
        ],
        colWidths=[6.75 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.8, border),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def two_column_table(rows, styles, widths=(2.1 * inch, 4.45 * inch)):
    data = [[p(left, styles["CellTitle"]), p(right, styles["Cell"])] for left, right in rows]
    table = Table(data, colWidths=list(widths), hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.6, SILVER),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, SILVER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 10)])


def section(title, body_items, styles):
    story = [p(title, styles["H1"])]
    for item in body_items:
        if isinstance(item, str):
            story.append(p(item, styles["Body"]))
        else:
            story.append(item)
    return story


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(PALE_GREEN)
    canvas.setLineWidth(0.8)
    canvas.line(doc.leftMargin, height - 0.55 * inch, width - doc.rightMargin, height - 0.55 * inch)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(FOREST)
    canvas.drawString(doc.leftMargin, height - 0.42 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(width - doc.rightMargin, height - 0.42 * inch, "Resurrection Evidence Audit Manual")
    canvas.setStrokeColor(PALE_GREEN)
    canvas.line(doc.leftMargin, 0.55 * inch, width - doc.rightMargin, 0.55 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.37 * inch, "Use the tool to clarify assumptions, not to outsource judgment.")
    canvas.drawRightString(width - doc.rightMargin, 0.37 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover_page(styles):
    mark_table = Table([[CoverMark()]], colWidths=[6.75 * inch], rowHeights=[1.85 * inch])
    mark_table.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER")]))
    tags = Table(
        [[p("Manual", styles["Tag"]), p("Sincere seekers", styles["Tag"]), p("Evidence audit", styles["Tag"])]],
        colWidths=[1.15 * inch, 1.65 * inch, 1.45 * inch],
        hAlign="CENTER",
    )
    tags.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.6, LEAF),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LEAF),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return [
        Spacer(1, 0.25 * inch),
        mark_table,
        p("Resurrection Evidence Audit", styles["Title"]),
        p(
            "A practical manual for honest inquiry, careful comparison, and clearer probability thinking.",
            styles["Subtitle"],
        ),
        tags,
        Spacer(1, 0.38 * inch),
        callout(
            "Core promise",
            "The tool does not ask users to become hostile to belief. It asks them to keep confidence, evidence, alternatives, and unknowns visible at the same time.",
            styles,
            fill=CREAM,
            border=LEAF,
        ),
        p(
            "This guide is written for Christians, doubters, former believers, teachers, and discussion groups who want to test resurrection and miracle claims without hiding the moving parts.",
            styles["Body"],
        ),
        p(
            "The aim is not a mechanical verdict. The aim is intellectual calibration: seeing what is doing the work, what is being assumed, and what would need to be stronger for the conclusion to be responsible.",
            styles["Body"],
        ),
        Spacer(1, 0.35 * inch),
        p("https://xhairs.com/apps/resurrection-evidence-audit/", styles["Quote"]),
        PageBreak(),
    ]


def build_story(styles):
    story = []
    story.extend(cover_page(styles))

    story.extend(
        section(
            "1. What This Tool Is For",
            [
                "The Resurrection Evidence Audit is a self-audit for miracle and resurrection claims. It helps users ask whether their confidence is being carried by evidence, by background assumptions, by personal commitment, by social trust, or by alternatives that have not yet been faced.",
                "The tool is especially useful when someone says a conclusion is obvious, but the actual pieces have not been placed side by side. It makes the user name the claim, assign a starting point, add evidence, compare alternatives, reserve room for unknown explanations, and then read the result with appropriate humility.",
                callout(
                    "The central question",
                    "What would the evidence need to look like for this exact claim to be justified?",
                    styles,
                    fill=PALE_GREEN,
                    border=LEAF,
                ),
                "A sincere seeker does not need a tool that flatters their preferred answer. They need a tool that lets them see where the weight of the argument really sits.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "2. Who Benefits Most",
            [
                two_column_table(
                    [
                        (
                            "Christians",
                            "Christians can use the audit to strengthen intellectual honesty. If a belief is important, it should not need hidden arithmetic, exaggerated independence, or dismissed alternatives.",
                        ),
                        (
                            "Doubters",
                            "Doubters can use the audit to avoid caricature. The tool lets them grant evidence where it exists while asking whether that evidence is strong enough for the specific claim.",
                        ),
                        (
                            "Former believers",
                            "Former believers can use the audit to sort inherited confidence from present evidence. It helps separate emotional residue from explicit reasoning.",
                        ),
                        (
                            "Teachers and groups",
                            "Teachers can use the audit as a shared whiteboard for discussion. It slows the argument down and prevents slogans from replacing comparison.",
                        ),
                    ],
                    styles,
                ),
                "The manual assumes good faith. A person can be sincere and still miscount evidence, understate alternatives, or refuse to name a probability because the number feels spiritually uncomfortable.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "3. Why Stating a Starting Probability Matters",
            [
                "Many apologetic conversations stall because someone refuses to assign any starting probability to a dead person rising. But comparison requires a number, even if it is only a rough estimate. Without a starting point, the user cannot tell how much evidence is needed.",
                "Refusing to estimate the starting probability does not avoid probability. It hides it. If a user treats the resurrection as easy to believe before the evidence is examined, that is already a starting probability. If a user treats it as nearly impossible no matter what, that is also a starting probability.",
                callout(
                    "Plain-language rule",
                    "A starting probability is not a final verdict. It is the confidence level before this case evidence is added.",
                    styles,
                    fill=CREAM,
                    border=BROWN,
                ),
                "The tool asks users to make this visible so the evidence can be compared honestly. A modest claim requires less support. A highly specific miracle claim carries a heavier burden.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "4. Begin With the Teaching Parallel",
            [
                "The recommended first exercise is the car-crash teaching parallel: a car crashed because a demon physically turned the steering wheel. This example lowers religious defensiveness while preserving the same structure as the resurrection case.",
                "Users compare the demon claim with ordinary alternatives such as mechanical failure, swerving to avoid an animal, falling asleep, distraction, road conditions, and unknown causes. The lesson is not that the cases are identical. The lesson is that evidence must be compared against competing explanations.",
                two_column_table(
                    [
                        ("Selected claim", "The claim being tested: a demon turned the wheel."),
                        ("Known material alternatives", "Explanations already named, such as mechanical failure or driver error."),
                        ("Unknown reserve", "Room left for causes not yet imagined or discovered."),
                        ("Evidence contribution", "Which item actually moves the claim, and by how much."),
                    ],
                    styles,
                ),
                "After the user sees how quickly a non-material explanation can be over-favored in the car-crash case, the resurrection case becomes easier to inspect without special pleading.",
            ],
            styles,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            "5. Basic Walkthrough",
            [
                numbered_list(
                    [
                        "<b>State the claim precisely.</b> Choose a preset or read the selected claim carefully. The audit is about the exact claim on the page, not a vague religious mood.",
                        "<b>Set the starting point.</b> Estimate baseline confidence before the case evidence is added. This is where the user faces the prior-probability question.",
                        "<b>Add evidence.</b> Adjust each evidence item by asking how likely it is if the claim is true, how likely it is if the claim is false, and how independent it really is.",
                        "<b>Compare alternatives.</b> Give ordinary, known alternatives their fair chance. If alternatives fit well, the miracle claim should not receive all the credit by default.",
                        "<b>Reserve room for unknowns.</b> Set aside space for unconceived explanations. This is epistemic humility, not a separate theory.",
                        "<b>Interpret the result.</b> Read the summary, donut charts, contribution map, pressure warnings, and repair moves together.",
                        "<b>Generate a report.</b> Use the report to explain the assumptions and invite further challenge.",
                    ],
                    styles,
                ),
                "The app is most useful when users move the sliders and watch what changes. The point is not to find the most comforting setting. The point is to discover which assumptions control the result.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "6. Key Terms in Plain English",
            [
                two_column_table(
                    [
                        ("Baseline confidence", "How plausible the claim is before this case evidence is added."),
                        ("Evidence lift", "How much the evidence raises or lowers the claim after independence and counterevidence are considered."),
                        ("Revised confidence", "The resulting confidence inside the known cause space after the current settings are applied."),
                        ("Selected claim (CL)", "The immaterial or miracle claim currently being audited."),
                        ("Known material alternatives (MA)", "Named ordinary alternatives that could explain the evidence without the selected miracle claim."),
                        ("Unknown reserve (UN)", "Space kept open for explanations not yet conceived. It can include material or immaterial possibilities."),
                        ("Independence weight", "How separate an evidence item is from the others. Shared sources should not be counted as fully independent."),
                        ("Audit pressure", "A warning score showing when assumptions may be carrying more weight than they currently justify."),
                    ],
                    styles,
                ),
            ],
            styles,
        )
    )

    story.append(PageBreak())
    story.extend(
        section(
            "7. Reading the Visuals",
            [
                two_column_table(
                    [
                        (
                            "Top summary row",
                            "Shows baseline confidence, net evidence lift, revised confidence, what is still needed for high confidence, audit pressure, and cause credence. It stays visible so the user sees the result change live.",
                        ),
                        (
                            "Audit pressure donut",
                            "Shows whether the current case is under strain. A higher number means the conclusion is depending heavily on contested assumptions, weak independence, dismissed alternatives, or large evidence jumps.",
                        ),
                        (
                            "Cause credence donut",
                            "Shows how the current probability is divided among the selected claim, known material alternatives, and the unknown reserve.",
                        ),
                        (
                            "Evidence contribution map",
                            "Answers, 'What is doing the work?' It shows which evidence items move the result up or down and how much of the movement each item carries.",
                        ),
                    ],
                    styles,
                ),
                callout(
                    "How the charts divide the labor",
                    "The credence donut shows where confidence ends up. The contribution map shows which evidence moved it there.",
                    styles,
                    fill=PALE_GREEN,
                    border=LEAF,
                ),
            ],
            styles,
        )
    )
    story.extend(
        section(
            "8. Common Mistakes the Tool Reveals",
            [
                bullet_list(
                    [
                        "<b>Counting related testimony as fully independent.</b> If reports share people, traditions, texts, or communities, they may not multiply confidence as much as they first appear to.",
                        "<b>Treating sincerity as confirmation.</b> Sincere people can be mistaken, misremember, interpret under pressure, or inherit a tradition honestly.",
                        "<b>Moving from unexplained to miraculous too quickly.</b> A gap in current explanation is not automatically evidence for a specific supernatural cause.",
                        "<b>Dismissing ordinary alternatives too fast.</b> Material alternatives must be weighed before the miracle claim receives the remaining probability.",
                        "<b>Ignoring negative evidence.</b> Delayed records, silence from external sources, and source dependence can pull against the claim.",
                        "<b>Refusing to estimate a prior.</b> This hides a probability judgment instead of removing one.",
                        "<b>Leaving no unknown reserve.</b> A zero-reserve posture often signals overconfidence, especially in ancient-history questions.",
                    ],
                    styles,
                ),
            ],
            styles,
        )
    )

    story.append(PageBreak())
    story.extend(
        section(
            "9. The Three Settings Buttons",
            [
                two_column_table(
                    [
                        (
                            "Believer-friendly settings",
                            "A generous pass that shows how the case looks when the user grants many apologetic assumptions. Useful for seeing the strongest charitable version.",
                        ),
                        (
                            "Seeker's audit settings",
                            "A middle setting for sincere inquiry. It gives evidence real force while preserving caution about independence, alternatives, and unknowns.",
                        ),
                        (
                            "Stricter audit settings",
                            "A tougher pass that asks what happens when the user demands stronger independence, clearer evidence, and more serious alternatives.",
                        ),
                    ],
                    styles,
                ),
                "The manual recommendation is to try all three. If a conclusion only survives under the believer-friendly setting, that is important information. If it remains strong under stricter settings, that is also important information.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "10. Interpreting the Result",
            [
                "A result is not an oracle. It is a diagnostic snapshot of the current assumptions. The app is telling the user what follows if the visible settings are accepted.",
                two_column_table(
                    [
                        ("Low revised confidence", "The current evidence, as entered, does not yet carry the specific claim very far."),
                        ("High audit pressure", "The conclusion may be leaning on assumptions that need defense or repair."),
                        ("Large unknown reserve", "The user is preserving room for missing causes, incomplete records, or explanations not yet named."),
                        ("Dominant evidence item", "One item is doing most of the work. That item deserves special scrutiny."),
                        ("Strong negative contribution", "A counterevidence item is materially dragging down the claim and should not be hidden in prose."),
                    ],
                    styles,
                ),
                "A mature interpretation can say, 'This is where the current assumptions lead, and this is what would need to improve for higher confidence.'",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "11. Using the AI Prompt",
            [
                "The AI prompt is designed to challenge the user's possible irrational stances, hidden assumptions, and calculation mistakes. It should be used as a pressure-testing partner, not as an authority.",
                callout(
                    "Good use",
                    "Ask the AI to identify where the user's priors, evidence weights, independence assumptions, alternative treatment, or unknown-reserve settings may be too convenient.",
                    styles,
                    fill=CREAM,
                    border=CLAY,
                ),
                "The user should still make the final judgment. AI can notice patterns, but it cannot replace intellectual responsibility.",
            ],
            styles,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            "12. Discussion Guide",
            [
                "For groups, the strongest sessions begin with the teaching parallel and then move to the resurrection preset. The facilitator should ask participants to explain why they moved a slider, not merely where they moved it.",
                numbered_list(
                    [
                        "Which slider felt most uncomfortable to move?",
                        "Which ordinary alternative did you most want to dismiss quickly?",
                        "Which evidence item carried the largest share of positive movement?",
                        "Did any negative evidence change the aggregate result?",
                        "What starting probability did you implicitly assume before the tool asked for one?",
                        "How much unknown reserve feels intellectually honest for ancient-history claims?",
                        "What evidence would actually lower your confidence?",
                        "What evidence would justifiably raise it?",
                    ],
                    styles,
                ),
            ],
            styles,
        )
    )

    story.extend(
        section(
            "13. Facilitator Notes",
            [
                bullet_list(
                    [
                        "Keep the tone calm. Defensiveness usually means the tool has found a pressure point.",
                        "Do not let participants treat the sliders as decoration. Every large movement should be explained.",
                        "Separate personal meaning from evidential support. A belief can matter deeply while still needing evidence.",
                        "Use the report as a record of assumptions, not as a debate trophy.",
                        "Encourage users to run the same logic on non-Christian claims. Consistency is part of the point.",
                    ],
                    styles,
                ),
                "The best manual use is iterative: run the teaching parallel, run the resurrection case, read the warnings, adjust one assumption at a time, and ask what changed.",
            ],
            styles,
        )
    )

    story.extend(
        section(
            "14. Glossary",
            [
                two_column_table(
                    [
                        ("Alternative", "A competing explanation that might account for the evidence without the selected claim."),
                        ("Bayes factor", "A measure of how much more expected the evidence is if the claim is true than if it is false."),
                        ("Credence", "A degree of confidence, usually expressed as a percentage."),
                        ("Independence", "The degree to which one evidence item is separate from another."),
                        ("Prior", "The starting probability before the present evidence is added."),
                        ("Reserve", "Probability deliberately left open because the user may be missing possibilities."),
                        ("Sensitivity", "How much the result changes when one assumption changes."),
                        ("Specific claim", "The exact proposition being tested, not a broad religious impression."),
                    ],
                    styles,
                ),
            ],
            styles,
        )
    )

    story.extend(
        section(
            "15. Final Word",
            [
                p(
                    "Honest inquiry does not require hostility toward belief. It requires refusing to let confidence outrun the evidence.",
                    styles["Quote"],
                ),
                "The Resurrection Evidence Audit is valuable because it makes the hidden parts visible: starting probabilities, evidence weights, dependence, alternatives, unknowns, and pressure points. A sincere seeker can then ask the most important question with less fog: what does the evidence actually justify?",
            ],
            styles,
        )
    )

    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.62 * inch,
        leftMargin=0.62 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="Resurrection Evidence Audit Manual",
        author="Crosshairs Audit Lab",
        subject="Manual for sincere seekers using the Resurrection Evidence Audit",
    )
    doc.build(build_story(styles), onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()
