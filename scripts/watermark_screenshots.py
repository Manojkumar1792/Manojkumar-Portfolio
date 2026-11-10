# One-off / reusable utility to stamp a subtle watermark onto portfolio screenshots.
# Usage: python scripts/watermark_screenshots.py [optional-subfolder-or-file]
# Run it only on NEWLY added, not-yet-watermarked images to avoid double-stamping.
import os
import sys
from PIL import Image, ImageDraw, ImageFont

WATERMARK_TEXT = "Manojkumar SA \u00b7 Portfolio"
IMG_EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_TARGET = os.path.join(ROOT, "screenshots")

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def watermark_image(path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size

    font_size = max(11, int(w * 0.012))
    font = load_font(font_size)

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    bbox = draw.textbbox((0, 0), WATERMARK_TEXT, font=font)
    text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    margin = max(8, int(w * 0.012))
    x = w - text_w - margin
    y = h - text_h - margin

    # Soft dark backing so the mark reads on both light and dark screenshots.
    pad = 4
    draw.rounded_rectangle(
        [x - pad, y - pad, x + text_w + pad, y + text_h + pad],
        radius=4, fill=(0, 0, 0, 55),
    )
    draw.text((x, y), WATERMARK_TEXT, font=font, fill=(255, 255, 255, 115))

    out = Image.alpha_composite(img, overlay)
    if path.lower().endswith((".jpg", ".jpeg")):
        out = out.convert("RGB")
    out.save(path)


def collect_images(target):
    if os.path.isfile(target):
        return [target] if target.lower().endswith(IMG_EXTENSIONS) else []
    found = []
    for dirpath, _dirs, files in os.walk(target):
        for name in files:
            if name.lower().endswith(IMG_EXTENSIONS):
                found.append(os.path.join(dirpath, name))
    return found


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TARGET
    target = target if os.path.isabs(target) else os.path.join(ROOT, target)
    images = collect_images(target)
    print(f"Found {len(images)} image(s) under {target}")
    for path in images:
        watermark_image(path)
        print(f"  watermarked: {os.path.relpath(path, ROOT)}")
    print("Done.")
