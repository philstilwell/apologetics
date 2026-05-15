from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "manuals" / "belief-overreach-audit-manual.pdf"

PALETTE = {
    "ink": colors.HexColor("#20140c"),
    "muted": colors.HexColor("#5f4b3d"),
    "paper": colors.HexColor("#fffaf3"),
    "line": colors.HexColor("#dccdb8"),
    "green": colors.HexColor("#327a4d"),
    "blue": colors.HexColor("#2b6890"),
    "amber": colors.HexColor("#be7a18"),
    "red": colors.HexColor("#af4638"),
    "brown": colors.HexColor("#724819"),
    "teal": colors.HexColor("#275f65"),
    "soft_green": colors.HexColor("#e7f0e8"),
    "soft_blue": colors.HexColor("#e5edf6"),
    "soft_amber": colors.HexColor("#f6ecdc"),
    "soft_red": colors.HexColor("#f7e7e4"),
    "soft_brown": colors.HexColor("#f2e7dc"),
}


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ManualTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=30,
            textColor=PALETTE["ink"],
            alignment=TA_LEFT,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ManualSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=12,
            leading=16,
            textColor=PALETTE["muted"],
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionKicker",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["brown"],
            spaceAfter=5,
            tracking=0.6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=PALETTE["ink"],
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subhead",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=PALETTE["ink"],
            spaceBefore=8,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyManual",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.25,
            leading=15,
            textColor=PALETTE["muted"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyManualTight",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=PALETTE["muted"],
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="QuoteCallout",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=PALETTE["ink"],
            alignment=TA_LEFT,
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CenterSmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=PALETTE["muted"],
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletManual",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.7,
            leading=13.4,
            textColor=PALETTE["muted"],
            leftIndent=0,
            spaceBefore=0,
            spaceAfter=1,
        )
    )
    return styles


def page_background(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    canvas.setFillColor(colors.HexColor("#fbf4e8"))
    canvas.rect(0, height - 0.9 * inch, width, 0.9 * inch, fill=1, stroke=0)

    canvas.setStrokeColor(PALETTE["line"])
    canvas.setLineWidth(0.8)
    canvas.line(0.7 * inch, 0.65 * inch, width - 0.7 * inch, 0.65 * inch)

    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(PALETTE["brown"])
    canvas.drawString(0.7 * inch, height - 0.48 * inch, "BELIEF OVERREACH AUDIT MANUAL")
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawRightString(width - 0.7 * inch, 0.42 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover_background(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    canvas.setFillColor(colors.HexColor("#f4e6cf"))
    canvas.rect(0, height - 2.7 * inch, width, 2.7 * inch, fill=1, stroke=0)

    canvas.setFillColor(PALETTE["green"])
    canvas.rect(0.72 * inch, height - 2.3 * inch, 1.32 * inch, 1.32 * inch, fill=1, stroke=0)
    canvas.setFillColor(PALETTE["blue"])
    canvas.rect(2.14 * inch, height - 2.3 * inch, 1.32 * inch, 1.32 * inch, fill=1, stroke=0)
    canvas.setFillColor(PALETTE["amber"])
    canvas.rect(3.56 * inch, height - 2.3 * inch, 1.32 * inch, 1.32 * inch, fill=1, stroke=0)
    canvas.setFillColor(PALETTE["red"])
    canvas.rect(4.98 * inch, height - 2.3 * inch, 1.32 * inch, 1.32 * inch, fill=1, stroke=0)

    canvas.setStrokeColor(colors.HexColor("#d1be9f"))
    canvas.setLineWidth(1.2)
    center_x = width - 1.32 * inch
    center_y = height - 1.72 * inch
    canvas.circle(center_x, center_y, 0.45 * inch, stroke=1, fill=0)
    canvas.line(center_x - 0.72 * inch, center_y, center_x - 0.12 * inch, center_y)
    canvas.line(center_x + 0.12 * inch, center_y, center_x + 0.72 * inch, center_y)
    canvas.line(center_x, center_y - 0.72 * inch, center_x, center_y - 0.12 * inch)
    canvas.line(center_x, center_y + 0.12 * inch, center_x, center_y + 0.72 * inch)

    canvas.setFillColor(PALETTE["ink"])
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(0.72 * inch, 0.78 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawString(0.72 * inch, 0.58 * inch, "Manual for sincere seekers, first-time users, and reflective debaters")
    canvas.restoreState()


def make_callout(text, styles):
    table = Table([[Paragraph(text, styles["QuoteCallout"])]], colWidths=[6.2 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fff2d6")),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#d9b56d")),
                ("LINEBEFORE", (0, 0), (0, -1), 6, PALETTE["amber"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return table


def make_info_box(title, body, styles, color_key, width):
    background_map = {
        "green": PALETTE["soft_green"],
        "blue": PALETTE["soft_blue"],
        "amber": PALETTE["soft_amber"],
        "red": PALETTE["soft_red"],
        "brown": PALETTE["soft_brown"],
    }
    title_para = Paragraph(f"<b>{title}</b>", styles["Subhead"])
    body_para = Paragraph(body, styles["BodyManualTight"])
    table = Table([[title_para], [body_para]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background_map.get(color_key, PALETTE["soft_brown"])),
                ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE[color_key]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def bullet_list(items, styles):
    return ListFlowable(
        [
            ListItem(Paragraph(item, styles["BulletManual"]), leftIndent=0, value="◉")
            for item in items
        ],
        bulletType="bullet",
        start="◉",
        leftIndent=10,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=9,
        bulletOffsetY=1,
    )


def cover_story(styles):
    return [
        Spacer(1, 2.9 * inch),
        Paragraph("Belief Overreach Audit", styles["ManualTitle"]),
        Paragraph(
            "A practical guide to the tool, its value for sincere seekers, and the right way to read its four scenario simulations.",
            styles["ManualSubtitle"],
        ),
        Spacer(1, 0.18 * inch),
        make_callout(
            "This manual does not ask the reader to adopt a conclusion first. It asks the reader to inspect whether a way of believing deserves trust.",
            styles,
        ),
        Spacer(1, 0.34 * inch),
        Table(
            [
                [
                    make_info_box(
                        "What the tool tests",
                        "Whether confidence, commitment, or surrender has started running ahead of the evidence the person themselves thinks they have.",
                        styles,
                        "green",
                        2.0 * inch,
                    ),
                    make_info_box(
                        "What the tool compares",
                        "The same sampled events, the same world, and four agents who differ only in how willing they are to let pull replace support.",
                        styles,
                        "blue",
                        2.0 * inch,
                    ),
                    make_info_box(
                        "Why it matters",
                        "Bad methods can look harmless in the abstract. This tool makes the cost of over-believing visible in domains people already understand.",
                        styles,
                        "amber",
                        2.0 * inch,
                    ),
                ]
            ],
            colWidths=[2.08 * inch, 2.08 * inch, 2.08 * inch],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
    ]


def build_story(styles):
    story = cover_story(styles)
    story.append(PageBreak())

    story.extend(
        [
            Paragraph("01  WHO THIS MANUAL IS FOR", styles["SectionKicker"]),
            Paragraph("Use this manual if you are trying to be fair to the tool and fair to yourself.", styles["SectionTitle"]),
            Paragraph(
                "The Belief Overreach Audit is most useful for a reader who is sincere about truth and willing to separate emotional pull from evidential support. It is written for believers, doubters, former believers, skeptics, and reflective fence-sitters who want to know whether a method of believing is dependable over time.",
                styles["BodyManual"],
            ),
            Paragraph(
                "The manual is not trying to train readers to sneer at faith. It is trying to train them to notice when confidence begins to exceed what their own support actually warrants. In this tool, that excess is called faith. Core rationality is the opposite move: keeping belief within perceived support.",
                styles["BodyManual"],
            ),
            make_callout(
                "The central practical claim is simple: once confidence outruns support, decisions usually become less truth-tracking and more costly.",
                styles,
            ),
            Spacer(1, 0.16 * inch),
            Paragraph("How to read the rest of the manual", styles["Subhead"]),
            bullet_list(
                [
                    "Start with the definitions, because the tool uses the word faith in a very specific way.",
                    "Then learn the four fields and the four agents before trying to interpret a graph.",
                    "Only after that should you treat the output as an argument about method rather than as a random streak.",
                ],
                styles,
            ),
        ]
    )

    story.append(Spacer(1, 0.16 * inch))
    story.append(HRFlowable(color=PALETTE["line"], width="100%", thickness=1))
    story.append(Spacer(1, 0.16 * inch))

    story.extend(
        [
            Paragraph("02  CORE DEFINITIONS", styles["SectionKicker"]),
            Paragraph("Faith, support, and core rationality", styles["SectionTitle"]),
            Paragraph(
                "<b>Faith</b> in this tool means a degree of belief, trust, or commitment that exceeds the degree of perceived evidence. The definition is narrow on purpose. It keeps the user focused on one question: has extra confidence been added without extra support?",
                styles["BodyManual"],
            ),
            Paragraph(
                "<b>Perceived support</b> means the support the person themselves currently takes themselves to have. The tool is not measuring hidden evidence from outside the agent. It is measuring what the agent is acting as if they know.",
                styles["BodyManual"],
            ),
            Paragraph(
                "<b>Core rationality</b> means that belief remains inside perceived support. It does not mean perfect certainty, perfect information, or paralysis. It means the person tries not to let hope, fear, hype, chemistry, or communal pressure do evidential work they have not earned.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        make_info_box(
                            "Faith",
                            "Confidence above perceived support. In the tool, this is the overreach variable.",
                            styles,
                            "red",
                            2.05 * inch,
                        ),
                        make_info_box(
                            "Support",
                            "What the user or agent takes the evidence to justify right now.",
                            styles,
                            "green",
                            2.05 * inch,
                        ),
                        make_info_box(
                            "Core rationality",
                            "A disciplined refusal to let commitment outrun perceived support.",
                            styles,
                            "blue",
                            2.05 * inch,
                        ),
                    ]
                ],
                colWidths=[2.08 * inch, 2.08 * inch, 2.08 * inch],
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("03  WHY THE TOOL HAS VALUE", styles["SectionKicker"]),
            Paragraph("Why sincere seekers should care", styles["SectionTitle"]),
            Paragraph(
                "Most people can immediately see why overconfidence is dangerous in gambling. They more slowly see the same structure in investing. They often see it only dimly in romance. In religion, many barely see it at all because the language becomes noble: trust, surrender, obedience, calling, hope, community, or devotion.",
                styles["BodyManual"],
            ),
            Paragraph(
                "This tool matters because it carries the same epistemic pattern across all four domains. It asks whether the person is still following the evidence, or whether a powerful feeling is being promoted to the status of support.",
                styles["BodyManual"],
            ),
            Paragraph("What the four fields are designed to reveal", styles["Subhead"]),
            Table(
                [
                    [
                        make_info_box(
                            "Gambling",
                            "Shows the pattern in a stripped-down environment where the cost of bad decision rules is easy to see.",
                            styles,
                            "green",
                            3.05 * inch,
                        ),
                        make_info_box(
                            "Investment",
                            "Shows how hype and gut feeling can impersonate due diligence and lead to larger exposure than the fundamentals justify.",
                            styles,
                            "amber",
                            3.05 * inch,
                        ),
                    ],
                    [
                        make_info_box(
                            "Romance",
                            "Shows how chemistry, loneliness, and fantasy can push commitment ahead of vetting, character, and verification.",
                            styles,
                            "blue",
                            3.05 * inch,
                        ),
                        make_info_box(
                            "Religion",
                            "Shows how meaning, belonging, beauty, fear, and inherited identity can push life-commitment ahead of evidential support.",
                            styles,
                            "red",
                            3.05 * inch,
                        ),
                    ],
                ],
                colWidths=[3.14 * inch, 3.14 * inch],
                rowHeights=None,
                style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]),
            ),
            Spacer(1, 0.18 * inch),
            make_callout(
                "The point is not that every leap of trust fails instantly. The point is that a method that repeatedly authorizes belief beyond support is a worse method for finding truth and for protecting a life-budget.",
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("04  MEET THE FOUR AGENTS", styles["SectionKicker"]),
            Paragraph("The same world, four different commitment thresholds", styles["SectionTitle"]),
            Paragraph(
                "The four named agents are not meant to be caricatures of real people. They are memory aids. Each one stands for a different rule about how easily the person allows pull to become permission.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        make_info_box(
                            "Ada Anchor",
                            "0 faith points. Ada caps belief at support. She is the tool's baseline for core rationality.",
                            styles,
                            "green",
                            2.95 * inch,
                        ),
                        make_info_box(
                            "Milo Maybe",
                            "10 faith points. Milo adds only a small premium of hope, trust, or optimism.",
                            styles,
                            "blue",
                            2.95 * inch,
                        ),
                    ],
                    [
                        make_info_box(
                            "Willa Wish",
                            "30 faith points. Willa lets desire or reassurance do a noticeable part of the reasoning.",
                            styles,
                            "amber",
                            2.95 * inch,
                        ),
                        make_info_box(
                            "Zeke Zeal",
                            "60 faith points. Zeke most strongly treats pull, longing, or communal pressure as warrant.",
                            styles,
                            "red",
                            2.95 * inch,
                        ),
                    ],
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
                style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
            ),
            Spacer(1, 0.16 * inch),
            Paragraph(
                "All four agents face the same sampled events. That matters. Their differences are not caused by a different world. Their differences come from the way they read the same world and from how quickly they convert pull into action.",
                styles["BodyManual"],
            ),
            Paragraph("What the line graph means", styles["Subhead"]),
            bullet_list(
                [
                    "If a line rises, the current method is doing better on that run so far.",
                    "If a line dips, the current method is paying for a bad commitment or a bad draw.",
                    "If a faith-heavy line wins for a while, that can be real. The point is to compare repeated performance, not one lucky burst.",
                ],
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("05  HOW TO USE THE TOOL", styles["SectionKicker"]),
            Paragraph("The basic workflow", styles["SectionTitle"]),
            Paragraph(
                "The cleanest first use is to stay with one field long enough to understand its rhythm. Read the left-hand framing cards, click <b>Try next event</b>, read the event card, compare the four action cards, and then watch the line graph absorb the result.",
                styles["BodyManual"],
            ),
            Paragraph("Quick-start sequence", styles["Subhead"]),
            bullet_list(
                [
                    "Choose a field: Gambling, Investment, Romance, or Religion.",
                    "Read the three framing boxes: what counts as support, what faith changes, and what is being spent.",
                    "Click <b>Try next event</b> once and read the central event card before you look at the graph.",
                    "Compare how Ada, Milo, Willa, and Zeke handled the same event.",
                    "Watch the cumulative graph after five to ten tries. Then use <b>Reset</b> and try again.",
                ],
                styles,
            ),
            Spacer(1, 0.14 * inch),
            make_callout(
                "Resets produce new pseudo-random runs. The tool is not deterministic. That is a feature, because a method should be judged across repeated uncertain events, not just one scripted storyline.",
                styles,
            ),
            Spacer(1, 0.18 * inch),
            Paragraph("How to read the event card", styles["Subhead"]),
            Table(
                [
                    [
                        make_info_box(
                            "Event stats",
                            "These tell you what kind of signal the current event carries. In religion, for example, the key measures are Evidence, Pull, and Demand.",
                            styles,
                            "brown",
                            2.95 * inch,
                        ),
                        make_info_box(
                            "Agent cards",
                            "These show the immediate decision, the realized change, and the short explanation for why each line moved the way it did.",
                            styles,
                            "blue",
                            2.95 * inch,
                        ),
                    ]
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("06  HOW TO INTERPRET THE OUTPUT", styles["SectionKicker"]),
            Paragraph("Do not mistake luck for vindication", styles["SectionTitle"]),
            Paragraph(
                "The most common mistake is to see a faith-heavy line lead for a while and treat that short streak as proof that the method works. The tool explicitly allows that kind of thing to happen, because bad methods really can get lucky. Hype can pop. A risky romance can briefly feel magical. A religious commitment can bring immediate structure, belonging, or relief.",
                styles["BodyManual"],
            ),
            Paragraph(
                "The deeper question is not whether overreach can ever produce a good moment. The deeper question is whether a rule that repeatedly authorizes confidence beyond support is a trustworthy way to steer a life. That is why the graph matters more than a single event card.",
                styles["BodyManual"],
            ),
            Paragraph("Use these four reading rules", styles["Subhead"]),
            bullet_list(
                [
                    "Read a single event locally, but read the graph globally.",
                    "Treat short bursts as noise unless they persist over many tries and many resets.",
                    "Compare methods against the same world, not against different anecdotes.",
                    "Ask what scarce resource is being spent: money, opportunity, emotional bandwidth, identity, obedience, or time.",
                ],
                styles,
            ),
            Spacer(1, 0.16 * inch),
            make_callout(
                "Truth does not require belief to transcend evidence. A method that repeatedly asks you to do that is asking for epistemic credit it has not earned.",
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("07  LIMITATIONS AND FAIR USE", styles["SectionKicker"]),
            Paragraph("What the tool is and is not claiming", styles["SectionTitle"]),
            bullet_list(
                [
                    "The scenarios are stylized comparisons, not literal measurements of every casino, portfolio, relationship, or church.",
                    "Some religious groups define faith more modestly as evidence-aligned trust. This tool is not mainly aimed at that narrower usage.",
                    "The tool is strongest when it is used to inspect a method of believing, not to score cheap points in an argument.",
                    "A result should function as a map for better questions, not as a machine that settles every philosophical dispute by itself.",
                ],
                styles,
            ),
            Spacer(1, 0.12 * inch),
            Paragraph(
                "Even with those limitations, the tool still makes a sharp claim: if an ideology positively encourages confidence that outruns perceived evidence, it is teaching a worse epistemic method than core rationality. That does not automatically prove the ideology false, but it does make it deeply suspect.",
                styles["BodyManual"],
            ),
            Paragraph(
                "If a reader wants the more technical background behind these themes, including the distinction between core and deeper rationality, the natural companion resource is <u>credencing.com</u>.",
                styles["BodyManual"],
            ),
            Paragraph("Suggested uses", styles["Subhead"]),
            bullet_list(
                [
                    "For sincere seekers: use the tool to examine whether your confidence is being earned or merely preserved.",
                    "For teachers and discussion leaders: use the four domains to help students spot one structure across very different kinds of life choices.",
                    "For debate partners: use the tool to move from slogans to explicit commitments and explicit costs.",
                ],
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("08  FREQUENT READER QUESTIONS", styles["SectionKicker"]),
            Paragraph("Anticipated questions from reflective users", styles["SectionTitle"]),
            Paragraph("<b>Does waiting for evidence mean doing nothing?</b>", styles["Subhead"]),
            Paragraph(
                "No. In the tool, waiting usually means declining to over-commit. It does not mean refusing to think, refusing to investigate, or refusing to live. The grounded line often gains by preserving optionality, clarity, and scarce resources while support is still weak.",
                styles["BodyManual"],
            ),
            Paragraph("<b>Why include religion with gambling and romance?</b>", styles["Subhead"]),
            Paragraph(
                "Because the structure being tested is the same: does pull become permission before support has earned it? The domains differ in tone and social meaning, but the epistemic question can still be held constant.",
                styles["BodyManual"],
            ),
            Paragraph("<b>Can faith ever help emotionally?</b>", styles["Subhead"]),
            Paragraph(
                "It can. The tool does not deny that. It asks whether emotional help should be confused with evidential warrant. Relief and truth can overlap, but they are not the same category.",
                styles["BodyManual"],
            ),
            Paragraph("<b>What is the most important lesson to take away?</b>", styles["Subhead"]),
            Paragraph(
                "If a claim is true, then careful attention to the evidence should not be its enemy. A method that repeatedly needs belief to run ahead of support is not just risky. It is inferior as a way of finding what is real.",
                styles["BodyManual"],
            ),
            Spacer(1, 0.24 * inch),
            Paragraph("Recommended first reading path", styles["Subhead"]),
            bullet_list(
                [
                    "Run Gambling once to learn the mechanics.",
                    "Run Investment next to see how hype can mimic substance.",
                    "Run Romance to watch chemistry outrun vetting.",
                    "Run Religion last, once the pattern is already familiar.",
                ],
                styles,
            ),
            Spacer(1, 0.22 * inch),
            Paragraph("Prepared for Crosshairs Audit Lab", styles["CenterSmall"]),
            Paragraph("Belief Overreach Audit manual - generated from repo source so it can be revised alongside the tool.", styles["CenterSmall"]),
        ]
    )

    return story


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.92 * inch,
        bottomMargin=0.78 * inch,
        title="Belief Overreach Audit Manual",
        author="Phil Stilwell",
        subject="Manual for the Belief Overreach Audit tool",
    )
    doc.build(build_story(styles), onFirstPage=cover_background, onLaterPages=page_background)


if __name__ == "__main__":
    build_pdf()
