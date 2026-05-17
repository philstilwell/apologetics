from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont

try:
    import qrcode
except Exception:
    qrcode = None


ROOT = Path(__file__).resolve().parent
ASSETS_DIR = ROOT / "assets"
PREVIEW_OUT = ASSETS_DIR / "visual-preview.png"
PATHWAY_OUT = ASSETS_DIR / "pathway-schematic.png"
HUB_QR_OUT = ASSETS_DIR / "hub-qr.png"
HUB_URL = "https://xhairs.com/"

W = 3200
H = 1800

BG_TOP = (246, 242, 234)
BG_BOTTOM = (236, 232, 224)
INK = (33, 36, 37)
MUTED = (96, 98, 95)
SLATE = (87, 113, 132)
TEAL = (87, 129, 126)
BRASS = (167, 118, 64)
STONE = (199, 189, 171)
PANEL = (250, 248, 243)
PANEL_ALT = (244, 240, 232)
WHITE = (255, 255, 255)
DARK_BAR = (40, 44, 46)

def font_candidates(*paths_with_indices):
    return [(Path(path), indices) for path, indices in paths_with_indices]


DISPLAY_FONT_CANDIDATES = font_candidates(
    ("/System/Library/Fonts/Supplemental/Avenir Next.ttc", [7, 8, 6, 3, 1, 0]),
    ("/System/Library/Fonts/Supplemental/Futura.ttc", [1, 0]),
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", [0]),
    ("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf", [0]),
)

REGULAR_FONT_CANDIDATES = font_candidates(
    ("/System/Library/Fonts/HelveticaNeue.ttc", [1, 0]),
    ("/System/Library/Fonts/Supplemental/Arial.ttf", [0]),
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", [0]),
    ("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf", [0]),
)


def load_font(candidates, size: int) -> ImageFont.FreeTypeFont:
    for path, indices in candidates:
        if not path.exists():
            continue
        for index in indices:
            try:
                return ImageFont.truetype(str(path), size=size, index=index)
            except Exception:
                continue
    return ImageFont.load_default()


TITLE_FONT = load_font(DISPLAY_FONT_CANDIDATES, 56)
SECTION_FONT = load_font(DISPLAY_FONT_CANDIDATES, 26)
LABEL_FONT = load_font(REGULAR_FONT_CANDIDATES, 24)
BODY_FONT = load_font(REGULAR_FONT_CANDIDATES, 21)
SMALL_FONT = load_font(REGULAR_FONT_CANDIDATES, 18)
TINY_FONT = load_font(REGULAR_FONT_CANDIDATES, 15)


def draw_vertical_gradient(draw: ImageDraw.ImageDraw) -> None:
    for y in range(H):
        t = y / (H - 1)
        r = int(BG_TOP[0] * (1 - t) + BG_BOTTOM[0] * t)
        g = int(BG_TOP[1] * (1 - t) + BG_BOTTOM[1] * t)
        b = int(BG_TOP[2] * (1 - t) + BG_BOTTOM[2] * t)
        draw.line((0, y, W, y), fill=(r, g, b))


def rounded(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill, outline, radius=28, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def centered_text(draw, xy, text, font, fill):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2), text, font=font, fill=fill)


def boxed_label(draw, box, title, subtitle=None, accent=SLATE):
    rounded(draw, box, PANEL, accent, radius=26, width=3)
    x1, y1, x2, y2 = box
    height = y2 - y1
    if subtitle:
        centered_text(draw, ((x1 + x2) / 2, y1 + height * 0.40), title, LABEL_FONT, INK)
        centered_text(draw, ((x1 + x2) / 2, y1 + height * 0.72), subtitle, SMALL_FONT, MUTED)
    else:
        centered_text(draw, ((x1 + x2) / 2, y1 + height / 2), title, LABEL_FONT, INK)


def wrapped_text(draw, box, text, font, fill, max_chars):
    x1, y1, x2, _ = box
    lines = wrap(text, width=max_chars)
    y = y1
    for line in lines:
        draw.text((x1, y), line, font=font, fill=fill)
        y += font.size + 7
    return len(lines), y


def bullet_list(draw, origin, items, title, accent):
    x, y = origin
    draw.text((x, y), title, font=SECTION_FONT, fill=accent)
    y += 48
    for item in items:
        draw.ellipse((x, y + 9, x + 11, y + 20), fill=accent)
        draw.text((x + 24, y), item, font=BODY_FONT, fill=MUTED)
        y += 41


def add_crosshair_overlay(base: Image.Image):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = 1600, 855
    for radius, alpha in [(580, 24), (440, 28), (300, 30), (170, 34)]:
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=(127, 138, 146, alpha), width=2)
    draw.line((140, cy, W - 140, cy), fill=(127, 138, 146, 22), width=2)
    draw.line((cx, 140, cx, H - 160), fill=(127, 138, 146, 22), width=2)
    for x in range(120, W, 190):
        draw.line((x, 120, x, H - 120), fill=(102, 112, 122, 13), width=1)
    for y in range(120, H, 130):
        draw.line((120, y, W - 120, y), fill=(102, 112, 122, 13), width=1)
    base.alpha_composite(overlay)


def build_preview():
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    img = Image.new("RGBA", (W, H), BG_TOP + (255,))
    draw = ImageDraw.Draw(img)
    draw_vertical_gradient(draw)
    add_crosshair_overlay(img)
    draw = ImageDraw.Draw(img)

    rounded(draw, (70, 62, W - 70, H - 72), (247, 244, 238, 188), (210, 201, 186, 220), radius=44, width=3)

    draw.text((130, 108), "VISUAL PREVIEW", font=SECTION_FONT, fill=BRASS)
    draw.text((W - 610, 108), "CROSSHAIRS AUDIT LAB", font=SECTION_FONT, fill=SLATE)
    draw.text((W - 732, 148), "epistemic calibration  •  structured self-audit  •  public defensibility", font=SMALL_FONT, fill=MUTED)

    title = "From inclination to accountable belief"
    draw.text((130, 182), title, font=TITLE_FONT, fill=INK)
    draw.text((132, 250), "A staged pathway for surfacing hidden assumptions, constraining overreach, and clarifying what a claim can actually bear.", font=LABEL_FONT, fill=MUTED)

    left_box = (130, 360, 860, 1095)
    center_box = (930, 360, 2270, 1095)
    right_box = (2340, 360, 3070, 1095)
    for box in [left_box, center_box, right_box]:
        rounded(draw, box, PANEL, STONE, radius=34, width=2)

    draw.text((left_box[0] + 34, left_box[1] + 28), "Starting pressures", font=SECTION_FONT, fill=INK)
    left_cards = [
        ("Inherited trust", "testimony, tradition, belonging"),
        ("Identity protection", "belief fused with biography and virtue"),
        ("Protected claims", "escape hatches buffer failure"),
        ("Bridge inflation", "thin support thickened into theology"),
        ("Moral immediacy", "certainty arrives before system design"),
    ]
    y = left_box[1] + 92
    for title, subtitle in left_cards:
        rounded(draw, (left_box[0] + 28, y, left_box[2] - 28, y + 104), PANEL_ALT, (221, 210, 192), radius=22, width=2)
        draw.ellipse((left_box[0] + 48, y + 28, left_box[0] + 88, y + 68), fill=BRASS)
        draw.text((left_box[0] + 108, y + 18), title, font=LABEL_FONT, fill=INK)
        draw.text((left_box[0] + 108, y + 56), subtitle, font=SMALL_FONT, fill=MUTED)
        y += 122

    draw.text((center_box[0] + 34, center_box[1] + 28), "Audit sequence", font=SECTION_FONT, fill=INK)
    boxed_label(draw, (center_box[0] + 72, center_box[1] + 92, center_box[0] + 390, center_box[1] + 192), "Theological inclination", "felt confidence", accent=(211, 196, 171))
    boxed_label(draw, (center_box[2] - 390, center_box[1] + 92, center_box[2] - 72, center_box[1] + 192), "Defensible belief", "proportioned confidence", accent=(189, 204, 217))

    nodes = [
        ("Calibration", SLATE),
        ("Testability", TEAL),
        ("Symmetry", BRASS),
        ("Evidence", SLATE),
        ("Moral system", TEAL),
        ("Bridge audit", BRASS),
    ]
    node_y1 = center_box[1] + 256
    node_h = 94
    node_w = 174
    gap = 24
    start_x = center_box[0] + 72
    for i, (label, accent) in enumerate(nodes):
        x1 = start_x + i * (node_w + gap)
        x2 = x1 + node_w
        rounded(draw, (x1, node_y1, x2, node_y1 + node_h), WHITE, accent, radius=22, width=3)
        centered_text(draw, ((x1 + x2) / 2, node_y1 + 47), label, LABEL_FONT, INK)
        if i < len(nodes) - 1:
            ax = x2 + gap / 2
            draw.line((x2 + 8, node_y1 + 47, x2 + gap - 12, node_y1 + 47), fill=(108, 111, 108), width=5)
            draw.polygon(
                [(x2 + gap - 12, node_y1 + 47), (x2 + gap - 28, node_y1 + 37), (x2 + gap - 28, node_y1 + 57)],
                fill=(108, 111, 108),
            )

    bullet_list(
        draw,
        (center_box[0] + 86, center_box[1] + 392),
        [
            "confidence vs support",
            "failure conditions",
            "live alternatives",
            "source routes and grounders",
        ],
        "What the suite surfaces",
        SLATE,
    )
    bullet_list(
        draw,
        (center_box[0] + 474, center_box[1] + 392),
        [
            "special pleading",
            "insulated interpretations",
            "unsupported bridge leaps",
            "overextended moral certainty",
        ],
        "What the suite constrains",
        BRASS,
    )
    bullet_list(
        draw,
        (center_box[0] + 912, center_box[1] + 392),
        [
            "narrower conclusions",
            "explicit revision paths",
            "sharper public disagreement",
            "accountable judgment",
        ],
        "What the user gains",
        TEAL,
    )

    draw.text((right_box[0] + 34, right_box[1] + 28), "Desired end state", font=SECTION_FONT, fill=INK)
    outcomes = [
        ("Thinner claims", "support is not forced to carry too much"),
        ("Explicit standards", "the route becomes discussable"),
        ("Public vulnerability", "evidence claims stay answerable to loss"),
        ("Constructive revision", "belief can narrow without collapse"),
        ("Clearer dialogue", "argument shifts from slogans to structure"),
    ]
    y = right_box[1] + 92
    for index, (title, subtitle) in enumerate(outcomes):
        fill = (239, 244, 247) if index % 2 == 0 else (246, 241, 232)
        rounded(draw, (right_box[0] + 28, y, right_box[2] - 28, y + 104), fill, (216, 205, 187), radius=22, width=2)
        draw.text((right_box[0] + 46, y + 18), title, font=LABEL_FONT, fill=INK)
        draw.text((right_box[0] + 46, y + 56), subtitle, font=SMALL_FONT, fill=MUTED)
        y += 122

    bottom_box = (130, 1180, 3070, 1650)
    rounded(draw, bottom_box, PANEL, STONE, radius=34, width=2)
    draw.text((bottom_box[0] + 34, bottom_box[1] + 28), "Nine-tool pathway", font=SECTION_FONT, fill=INK)
    draw.text((bottom_box[2] - 870, bottom_box[1] + 32), "A pedagogical progression from generic calibration to moral architecture and theological bridge control.", font=SMALL_FONT, fill=MUTED)

    group_boxes = [
        ((bottom_box[0] + 34, bottom_box[1] + 92, bottom_box[0] + 640, bottom_box[1] + 396), "1. Calibration", "Belief Overreach Audit", ["confidence vs support", "overcommitment becomes visible"], SLATE),
        ((bottom_box[0] + 684, bottom_box[1] + 92, bottom_box[0] + 1400, bottom_box[1] + 396), "2-4. Public claims", "Earthly Promise  •  Inductive Symmetry  •  Resurrection Evidence", ["testability", "fair comparison", "explicit accounting"], BRASS),
        ((bottom_box[0] + 1444, bottom_box[1] + 92, bottom_box[0] + 2140, bottom_box[1] + 396), "5-7. Moral architecture", "Threshold  •  Stress Test  •  Particulars", ["system entry", "source stress", "case consistency"], TEAL),
        ((bottom_box[0] + 2184, bottom_box[1] + 92, bottom_box[2] - 34, bottom_box[1] + 396), "8-9. Theological thickening", "Fine-Tuning Bridge  •  Theism Gradient", ["bridge discipline", "claim-lane mapping", "proportioned conclusion"], SLATE),
    ]
    for box, heading, title, bullets, accent in group_boxes:
        rounded(draw, box, WHITE, accent, radius=24, width=3)
        x1, y1, x2, y2 = box
        draw.text((x1 + 26, y1 + 22), heading, font=SECTION_FONT, fill=accent)
        _, wrapped_bottom = wrapped_text(draw, (x1 + 26, y1 + 68, x2 - 26, y2), title, LABEL_FONT, INK, 24)
        by = wrapped_bottom + 14
        for bullet in bullets:
            draw.ellipse((x1 + 28, by + 9, x1 + 39, by + 20), fill=accent)
            draw.text((x1 + 52, by), bullet, font=BODY_FONT, fill=MUTED)
            by += 38

    rounded(draw, (130, 1690, 3070, 1738), DARK_BAR, DARK_BAR, radius=18, width=1)
    draw.text((154, 1703), "Visual thesis: staged audits convert inherited theological confidence into inspectable, revisable, and publicly accountable belief claims.", font=SMALL_FONT, fill=(240, 236, 229))
    draw.text((2290, 1703), "clarity  •  symmetry  •  correction-readiness", font=SMALL_FONT, fill=(206, 212, 215))

    rgb = img.convert("RGB")
    rgb.save(PREVIEW_OUT, quality=96)
    rgb.crop((118, 1160, 3082, 1668)).save(PATHWAY_OUT, quality=96)

    if qrcode is not None:
        qr_img = qrcode.make(HUB_URL)
        qr_img = qr_img.resize((520, 520))
        qr_img.save(HUB_QR_OUT)


def main():
    build_preview()


if __name__ == "__main__":
    main()
