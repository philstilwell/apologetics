from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "manuals" / "belief-overreach-audit-manual-v2.pdf"

PALETTE = {
    "ink": colors.HexColor("#20140c"),
    "muted": colors.HexColor("#5d4a3d"),
    "paper": colors.HexColor("#fff9f1"),
    "sand": colors.HexColor("#f4e6cf"),
    "line": colors.HexColor("#dccdb8"),
    "green": colors.HexColor("#327a4d"),
    "blue": colors.HexColor("#275f9d"),
    "amber": colors.HexColor("#be7a18"),
    "red": colors.HexColor("#af4638"),
    "brown": colors.HexColor("#724819"),
    "teal": colors.HexColor("#275f65"),
    "soft_green": colors.HexColor("#e8f1e8"),
    "soft_blue": colors.HexColor("#e6eef7"),
    "soft_amber": colors.HexColor("#f8efde"),
    "soft_red": colors.HexColor("#f8e7e4"),
    "soft_brown": colors.HexColor("#f3e9dc"),
    "soft_gold": colors.HexColor("#fff4d8"),
}


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleManual",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=27,
            leading=31,
            textColor=PALETTE["ink"],
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubtitleManual",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=12.3,
            leading=16.2,
            textColor=PALETTE["muted"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EyebrowManual",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["brown"],
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitleManual",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=PALETTE["ink"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubheadManual",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=15.5,
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
            fontSize=10.2,
            leading=14.6,
            textColor=PALETTE["muted"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyTightManual",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=13.2,
            textColor=PALETTE["muted"],
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardTitleManual",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13.2,
            textColor=PALETTE["ink"],
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutManual",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=PALETTE["ink"],
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallCenterManual",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=10.8,
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
            leading=13.2,
            textColor=PALETTE["muted"],
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
    canvas.line(0.68 * inch, 0.62 * inch, width - 0.68 * inch, 0.62 * inch)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(PALETTE["brown"])
    canvas.drawString(0.72 * inch, height - 0.48 * inch, "BELIEF OVERREACH AUDIT MANUAL")
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawRightString(width - 0.72 * inch, 0.41 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover_background(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PALETTE["paper"])
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(PALETTE["sand"])
    canvas.rect(0, height - 2.65 * inch, width, 2.65 * inch, fill=1, stroke=0)

    block_y = height - 2.22 * inch
    for index, color_name in enumerate(["green", "blue", "amber", "red"]):
        canvas.setFillColor(PALETTE[color_name])
        canvas.rect((0.8 + index * 1.42) * inch, block_y, 1.28 * inch, 1.28 * inch, fill=1, stroke=0)

    canvas.setStrokeColor(colors.HexColor("#cfba98"))
    canvas.setLineWidth(1.2)
    center_x = width - 1.4 * inch
    center_y = height - 1.67 * inch
    canvas.circle(center_x, center_y, 0.42 * inch, stroke=1, fill=0)
    canvas.line(center_x - 0.7 * inch, center_y, center_x - 0.1 * inch, center_y)
    canvas.line(center_x + 0.1 * inch, center_y, center_x + 0.7 * inch, center_y)
    canvas.line(center_x, center_y - 0.7 * inch, center_x, center_y - 0.1 * inch)
    canvas.line(center_x, center_y + 0.1 * inch, center_x, center_y + 0.7 * inch)

    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.setFillColor(PALETTE["ink"])
    canvas.drawString(0.72 * inch, 0.8 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 8.2)
    canvas.setFillColor(PALETTE["muted"])
    canvas.drawString(0.72 * inch, 0.58 * inch, "Revised edition for the Belief Overreach Audit tool")
    canvas.restoreState()


def callout(text, styles):
    box = Table([[Paragraph(text, styles["CalloutManual"])]], colWidths=[6.18 * inch])
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["soft_gold"]),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#d7b56b")),
                ("LINEBEFORE", (0, 0), (0, -1), 6, PALETTE["amber"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return box


def info_card(title, body, styles, accent, width):
    background_map = {
        "green": PALETTE["soft_green"],
        "blue": PALETTE["soft_blue"],
        "amber": PALETTE["soft_amber"],
        "red": PALETTE["soft_red"],
        "brown": PALETTE["soft_brown"],
    }
    card = Table(
        [[Paragraph(title, styles["CardTitleManual"])], [Paragraph(body, styles["BodyTightManual"])]],
        colWidths=[width],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background_map.get(accent, PALETTE["soft_brown"])),
                ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE[accent]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return card


def bullet_list(items, styles):
    return ListFlowable(
        [ListItem(Paragraph(item, styles["BulletManual"]), value="-") for item in items],
        bulletType="bullet",
        start="-",
        leftIndent=12,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=10,
        bulletOffsetY=1,
    )


def cover_story(styles):
    return [
        Spacer(1, 2.9 * inch),
        Paragraph("Belief Overreach Audit", styles["TitleManual"]),
        Paragraph(
            "A reader's manual for the simulator, its underlying argument, and the most honest way to interpret what its four scenario lines are showing.",
            styles["SubtitleManual"],
        ),
        Spacer(1, 0.15 * inch),
        callout(
            "This manual does not ask the reader to adopt a conclusion first. It asks the reader to inspect whether a way of believing deserves trust.",
            styles,
        ),
        Spacer(1, 0.28 * inch),
        Table(
            [
                [
                    info_card(
                        "What the tool tests",
                        "Whether confidence, trust, or surrender has started running ahead of the support a person thinks they actually have.",
                        styles,
                        "green",
                        1.95 * inch,
                    ),
                    info_card(
                        "What the tool compares",
                        "The same sampled events, the same world, and four agents who differ only in how much pull they let replace support.",
                        styles,
                        "blue",
                        1.95 * inch,
                    ),
                    info_card(
                        "Why it matters",
                        "Bad methods can feel harmless in the abstract. This tool makes the hidden cost of over-believing easier to see.",
                        styles,
                        "amber",
                        1.95 * inch,
                    ),
                ]
            ],
            colWidths=[2.06 * inch, 2.06 * inch, 2.06 * inch],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
    ]


def build_story(styles):
    story = cover_story(styles)
    story.append(PageBreak())

    story.extend(
        [
            Paragraph("01  START HERE", styles["EyebrowManual"]),
            Paragraph("What this manual is trying to help the reader do", styles["SectionTitleManual"]),
            Paragraph(
                "This manual is for sincere seekers, reflective debaters, and first-time users who want to understand what the Belief Overreach Audit is actually measuring. The strongest use of the tool is not to score a quick rhetorical point. The strongest use is to test whether a method of believing deserves trust.",
                styles["BodyManual"],
            ),
            Paragraph(
                "The manual therefore does two jobs at once. First, it explains the interface: the fields, the agents, the event cards, and the graph. Second, it explains the argument under the interface: that confidence above support is usually a worse truth-finding method than core rationality.",
                styles["BodyManual"],
            ),
            Paragraph("Roadmap", styles["SubheadManual"]),
            Table(
                [
                    [
                        info_card("1. Core idea", "Learn the tool's definition of faith and the contrast with core rationality.", styles, "red", 3.0 * inch),
                        info_card("2. Read the simulator", "See how the four agents, the event card, and the graph fit together.", styles, "blue", 3.0 * inch),
                    ],
                    [
                        info_card("3. Walk the four fields", "Understand what Gambling, Investment, Romance, and Religion are each meant to reveal.", styles, "amber", 3.0 * inch),
                        info_card("4. Interpret the output", "Learn how to treat short-term luck, randomness, and long-run performance fairly.", styles, "green", 3.0 * inch),
                    ],
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
                style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
            ),
            Spacer(1, 0.16 * inch),
            callout(
                "The tool becomes most useful when the reader keeps asking one simple question: did this line move because the world changed, or because the agent let pull do evidential work it had not earned?",
                styles,
            ),
        ]
    )

    story.append(Spacer(1, 0.16 * inch))
    story.append(HRFlowable(color=PALETTE["line"], width="100%", thickness=1))
    story.append(Spacer(1, 0.16 * inch))

    story.extend(
        [
            Paragraph("02  CORE IDEA", styles["EyebrowManual"]),
            Paragraph("Faith, support, and core rationality", styles["SectionTitleManual"]),
            Paragraph(
                "<b>Faith</b> in this manual means a degree of belief, trust, or commitment that exceeds the degree of perceived evidence. It does not mean every use of the word faith in every community. It means confidence added beyond what the person themselves thinks the case can carry.",
                styles["BodyManual"],
            ),
            Paragraph(
                "<b>Perceived support</b> means the support the person currently takes themselves to have. The tool is not pretending to read hidden evidence from the outside. It is asking whether the person is acting as if they know more than they think they know.",
                styles["BodyManual"],
            ),
            Paragraph(
                "<b>Core rationality</b> means that belief stays inside perceived support. It is not paralysis. It is not perfect certainty. It is a disciplined refusal to let hope, hype, chemistry, fear, beauty, or belonging count as evidence unless they have actually become evidence.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        info_card("Faith", "Confidence above perceived support. In this tool, that is the overreach variable.", styles, "red", 2.0 * inch),
                        info_card("Support", "What the user or agent takes the evidence to justify right now.", styles, "green", 2.0 * inch),
                        info_card("Core rationality", "A policy of trying not to let commitment outrun perceived support.", styles, "blue", 2.0 * inch),
                    ]
                ],
                colWidths=[2.07 * inch, 2.07 * inch, 2.07 * inch],
            ),
            Spacer(1, 0.18 * inch),
            Paragraph("A plain reading rule", styles["SubheadManual"]),
            bullet_list(
                [
                    "If confidence rises while support also rises, that may be healthy calibration.",
                    "If confidence rises without support rising, the added portion is the faith portion under this tool's definition.",
                    "If an ideology praises that added portion as a virtue, the tool treats that ideology as epistemically suspect.",
                ],
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("03  HOW THE SIMULATOR WORKS", styles["EyebrowManual"]),
            Paragraph("The same world, four different commitment thresholds", styles["SectionTitleManual"]),
            Paragraph(
                "The tool works by holding the event stream constant and changing only the agents' willingness to convert pull into commitment. That is why the comparison is meaningful. Ada, Milo, Willa, and Zeke are not facing four different worlds. They are reading the same sampled world with four different methods.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        info_card("Ada Anchor", "0 faith points. Ada is the baseline. She tries not to let confidence outrun support at all.", styles, "green", 3.0 * inch),
                        info_card("Milo Maybe", "10 faith points. Milo adds a small premium of optimism, trust, or hope.", styles, "blue", 3.0 * inch),
                    ],
                    [
                        info_card("Willa Wish", "30 faith points. Willa lets desire or reassurance do a noticeable amount of the reasoning.", styles, "amber", 3.0 * inch),
                        info_card("Zeke Zeal", "60 faith points. Zeke most readily treats longing, pressure, or atmosphere as warrant.", styles, "red", 3.0 * inch),
                    ],
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
            ),
            Spacer(1, 0.16 * inch),
            Paragraph("How to read one try", styles["SubheadManual"]),
            Table(
                [
                    [
                        info_card("Field framing", "The left-hand boxes tell you what counts as support in that domain, what faith changes, and what scarce resource is being spent.", styles, "brown", 2.0 * inch),
                        info_card("Event card", "The event card shows one shared situation for all four agents. This is the local problem they are all solving.", styles, "amber", 2.0 * inch),
                        info_card("Line graph", "The graph is the cumulative verdict. It matters more than one dramatic event, because methods should be judged over repeated tries.", styles, "blue", 2.0 * inch),
                    ]
                ],
                colWidths=[2.07 * inch, 2.07 * inch, 2.07 * inch],
            ),
            Spacer(1, 0.18 * inch),
            callout(
                "One try can be misleading. The graph matters because a method that occasionally gets lucky can still be a systematically worse method.",
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("04  THE FOUR FIELDS", styles["EyebrowManual"]),
            Paragraph("Why the tool uses Gambling, Investment, Romance, and Religion", styles["SectionTitleManual"]),
            Paragraph(
                "The four fields are not random examples. They form a ladder. In Gambling, the cost of a bad rule is easiest to see. In Investment, people begin confusing story with substance. In Romance, the emotional pressure grows stronger. In Religion, that pressure often becomes socially protected and linguistically noble.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        info_card("Gambling", "A stripped-down case. The user sees quickly that feeling lucky does not improve the odds. It only changes whether the player makes the more foolish move.", styles, "green", 3.0 * inch),
                        info_card("Investment", "Shows how hype, buzz, and gut feeling can impersonate due diligence and justify larger exposure than the fundamentals support.", styles, "amber", 3.0 * inch),
                    ],
                    [
                        info_card("Romance", "Shows how chemistry, loneliness, fantasy, or urgency can move commitment ahead of vetting, character, and verification.", styles, "blue", 3.0 * inch),
                        info_card("Religion", "Shows how meaning, belonging, beauty, fear, guilt, and inherited identity can move life-commitment ahead of evidential support.", styles, "red", 3.0 * inch),
                    ],
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
            ),
            Spacer(1, 0.16 * inch),
            Paragraph("What each field spends", styles["SubheadManual"]),
            bullet_list(
                [
                    "Gambling spends bankroll dollars.",
                    "Investment spends portfolio dollars and opportunity cost.",
                    "Romance spends trust, time, exclusivity, and emotional bandwidth.",
                    "Religion spends time, identity, obedience, money, and life-direction.",
                ],
                styles,
            ),
            Spacer(1, 0.1 * inch),
            Paragraph("Quick comparison grid", styles["SubheadManual"]),
            Table(
                [
                    [
                        Paragraph("<b>Field</b>", styles["BodyTightManual"]),
                        Paragraph("<b>What counts as support</b>", styles["BodyTightManual"]),
                        Paragraph("<b>What overreach looks like</b>", styles["BodyTightManual"]),
                    ],
                    [
                        Paragraph("Gambling", styles["BodyTightManual"]),
                        Paragraph("The actual payout structure and the real hand strength.", styles["BodyTightManual"]),
                        Paragraph("Treating a lucky feeling as a reason to chase one more card.", styles["BodyTightManual"]),
                    ],
                    [
                        Paragraph("Investment", styles["BodyTightManual"]),
                        Paragraph("Fundamentals, downside risk, and expected value.", styles["BodyTightManual"]),
                        Paragraph("Treating buzz, story, or momentum as if they had become substance.", styles["BodyTightManual"]),
                    ],
                    [
                        Paragraph("Romance", styles["BodyTightManual"]),
                        Paragraph("Character, verification, reliability, and earned trust.", styles["BodyTightManual"]),
                        Paragraph("Turning chemistry or longing into deep commitment too quickly.", styles["BodyTightManual"]),
                    ],
                    [
                        Paragraph("Religion", styles["BodyTightManual"]),
                        Paragraph("Actual evidential support for the claim being asked to govern life.", styles["BodyTightManual"]),
                        Paragraph("Treating meaning, belonging, fear, or beauty as if they had become evidence.", styles["BodyTightManual"]),
                    ],
                ],
                colWidths=[1.05 * inch, 2.42 * inch, 2.71 * inch],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, 0), PALETTE["soft_brown"]),
                        ("BOX", (0, 0), (-1, -1), 1, PALETTE["line"]),
                        ("INNERGRID", (0, 0), (-1, -1), 0.8, PALETTE["line"]),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 7),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]
                ),
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("05  HOW TO READ THE GRAPH", styles["EyebrowManual"]),
            Paragraph("Do not mistake a streak for a method", styles["SectionTitleManual"]),
            Paragraph(
                "The line graph is the heart of the tool. It shows what each policy does over repeated tries, not just how one event felt in the moment. That matters because worse methods can still produce brief runs of success. A hype stock can surge. A risky romance can feel euphoric for a while. A faith-heavy religious commitment can immediately provide belonging or structure.",
                styles["BodyManual"],
            ),
            Paragraph(
                "The question is not whether faith can ever look rewarding. The question is whether a rule that repeatedly authorizes confidence beyond support is dependable over time. The graph is where that answer becomes visible.",
                styles["BodyManual"],
            ),
            Paragraph("Four reading rules", styles["SubheadManual"]),
            bullet_list(
                [
                    "Read the event card locally, but read the graph globally.",
                    "Treat short bursts as noise until they survive many tries and many resets.",
                    "Ask what scarce resource is being spent, not only what temporary reward was felt.",
                    "Compare the methods against the same world, not against four different anecdotes.",
                ],
                styles,
            ),
            Spacer(1, 0.16 * inch),
            Paragraph("Randomness and fairness", styles["SubheadManual"]),
            Paragraph(
                "The tries are pseudo-random rather than deterministic. That is not a flaw. It is the right way to test a method. Real life also contains uncertainty, noise, and uneven runs. The point of resetting the tool is not to chase a favorite result. The point is to see whether the same method keeps protecting or draining the life-budget across many runs.",
                styles["BodyManual"],
            ),
            callout(
                "A bad method that gets lucky is still a bad method. Luck can hide the flaw for a while. It does not repair the flaw.",
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("06  FIELD WALKTHROUGHS", styles["EyebrowManual"]),
            Paragraph("What each domain is teaching the user to notice", styles["SectionTitleManual"]),
            Paragraph("Gambling", styles["SubheadManual"]),
            Paragraph(
                "Gambling teaches the cleanest version of the pattern. The user can see that the world has not improved merely because the player feels hot, due, blessed, or lucky. The difference between the lines comes from whether a player treats that feeling as guidance once the hand has already become good enough to bank.",
                styles["BodyManual"],
            ),
            Paragraph("Investment", styles["SubheadManual"]),
            Paragraph(
                "Investment adds a layer of realism. Here the problem is not raw superstition but story inflation. Buzz, momentum, and narrative can begin impersonating due diligence. The tool asks whether the investor is repeatedly calling weak evidence good enough and then sizing positions too generously because the atmosphere feels exciting.",
                styles["BodyManual"],
            ),
            Paragraph("Romance", styles["SubheadManual"]),
            Paragraph(
                "Romance shows the same structure in a setting where the costs are less obviously numerical. The rational line does not refuse intimacy forever. It refuses to convert spark into deep trust before character and verification have earned that trust. The faith-heavy lines spend more of the life-budget on fantasy, urgency, and idealization.",
                styles["BodyManual"],
            ),
            Paragraph("Religion", styles["SubheadManual"]),
            Paragraph(
                "Religion is the most socially protected case. The encounter may contain beauty, belonging, meaning, moral seriousness, inherited identity, urgency, or fear. None of those are trivial. The tool's point is simply that they can be powerful without becoming evidence. If they push commitment beyond support, the same overreach structure is present here too.",
                styles["BodyManual"],
            ),
            Table(
                [
                    [
                        info_card("Most common gambling mistake", "Thinking the draw felt special and therefore treating a worse bet as a smarter bet.", styles, "green", 3.0 * inch),
                        info_card("Most common religion mistake", "Treating emotional and communal force as if it had become evidential warrant.", styles, "red", 3.0 * inch),
                    ]
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("07  LIMITATIONS AND FAIR USE", styles["EyebrowManual"]),
            Paragraph("What the tool is and is not claiming", styles["SectionTitleManual"]),
            bullet_list(
                [
                    "The scenarios are stylized comparisons, not literal measurements of every casino, portfolio, relationship, or church.",
                    "Some religious groups define faith more modestly as evidence-aligned trust or confidence. This manual is not mainly targeting that narrower usage.",
                    "The tool is best used to inspect a method of believing, not to function as a shortcut that settles every deeper historical or philosophical dispute.",
                    "A result should act like a map for sharper questions, not like a trophy that removes the need for further thought.",
                ],
                styles,
            ),
            Spacer(1, 0.12 * inch),
            Paragraph(
                "Even with those limits, the tool still makes a strong argument. If an ideology regularly praises confidence that outruns perceived support, then it is teaching a worse epistemic policy than core rationality. That fact alone does not deductively prove the ideology false, but it does make it deeply suspect, because truth does not need belief to transcend the evidence in order to stay true.",
                styles["BodyManual"],
            ),
            Paragraph("Two common misreadings to avoid", styles["SubheadManual"]),
            Table(
                [
                    [
                        info_card("Misreading 1", "If faith sometimes wins, then faith has been vindicated. The manual rejects this. Stochastic success does not erase a structurally worse method.", styles, "amber", 3.0 * inch),
                        info_card("Misreading 2", "If the grounded line waits, it has chosen emptiness. The manual rejects this too. Waiting can preserve clarity, optionality, and scarce resources.", styles, "blue", 3.0 * inch),
                    ]
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
            ),
            Spacer(1, 0.16 * inch),
            callout(
                "The deepest practical question is not whether a belief is comforting. It is whether the method used to sustain that belief deserves trust.",
                styles,
            ),
        ]
    )

    story.append(PageBreak())

    story.extend(
        [
            Paragraph("08  PRACTICAL TAKEAWAYS", styles["EyebrowManual"]),
            Paragraph("How a sincere seeker can use the tool well", styles["SectionTitleManual"]),
            Paragraph("A good first run", styles["SubheadManual"]),
            bullet_list(
                [
                    "Start with Gambling to learn the mechanics of the graph and the meaning of a worse decision rule.",
                    "Then move to Investment to see how weak evidence can be dressed up as confidence.",
                    "Use Romance next to watch chemistry outrun vetting.",
                    "Save Religion for last, once the shared structure across the other three domains is already visible.",
                ],
                styles,
            ),
            Paragraph("Questions worth asking yourself after a run", styles["SubheadManual"]),
            bullet_list(
                [
                    "Which line best resembles the way I currently handle under-supported claims?",
                    "Where in my life do I quietly let pull count as if it were support?",
                    "Do I excuse faith-driven overreach in domains I emotionally care about while rejecting it elsewhere?",
                    "If a claim is true, why should honest attention to evidence threaten it?",
                ],
                styles,
            ),
            Paragraph("Companion material", styles["SubheadManual"]),
            Paragraph(
                "Readers who want the more technical background behind these ideas should continue to <u>credencing.com</u>, where core rationality and deeper rationality are treated more formally.",
                styles["BodyManual"],
            ),
            Paragraph("Compact glossary", styles["SubheadManual"]),
            Table(
                [
                    [
                        info_card("Perceived support", "The support the person currently takes themselves to have.", styles, "green", 3.0 * inch),
                        info_card("Pull", "The emotional or social force of an experience that can feel strong without becoming evidence.", styles, "amber", 3.0 * inch),
                    ],
                    [
                        info_card("Demand", "How much a claim is asking the person to spend in time, money, obedience, identity, or life-direction.", styles, "red", 3.0 * inch),
                        info_card("Life-budget", "The total stock of scarce resources a person is spending while they live out a belief: time, trust, money, attention, and identity.", styles, "blue", 3.0 * inch),
                    ],
                ],
                colWidths=[3.08 * inch, 3.08 * inch],
                style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
            ),
            Spacer(1, 0.18 * inch),
            Table(
                [
                    [
                        info_card("One-sentence summary", "Belief Overreach Audit argues that confidence beyond perceived evidence is a worse method for finding truth and for protecting a life-budget.", styles, "brown", 6.16 * inch)
                    ]
                ],
                colWidths=[6.18 * inch],
            ),
            Spacer(1, 0.28 * inch),
            Paragraph("Prepared for Crosshairs Audit Lab", styles["SmallCenterManual"]),
            Paragraph("Revised Belief Overreach Audit manual generated from repo source so it can be improved alongside the tool itself.", styles["SmallCenterManual"]),
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
        topMargin=0.94 * inch,
        bottomMargin=0.78 * inch,
        title="Belief Overreach Audit Manual - Revised Edition",
        author="Phil Stilwell",
        subject="Manual for the Belief Overreach Audit tool",
    )
    doc.build(build_story(styles), onFirstPage=cover_background, onLaterPages=page_background)


if __name__ == "__main__":
    build_pdf()
