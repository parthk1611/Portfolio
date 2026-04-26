"""Tests for the portfolio website files."""
import os
import re

PORTFOLIO_DIR = os.path.dirname(os.path.abspath(__file__))

def read_file(name):
    with open(os.path.join(PORTFOLIO_DIR, name), "r") as f:
        return f.read()

# --- index.html tests ---
class TestIndexHTML:
    def setup_method(self):
        self.html = read_file("index.html")

    def test_file_exists(self):
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "index.html"))

    def test_has_doctype(self):
        assert self.html.strip().startswith("<!DOCTYPE html>")

    def test_links_gsap_cdn(self):
        assert "gsap" in self.html.lower()
        assert "ScrollTrigger" in self.html

    def test_uses_local_tailwind_setup(self):
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "tailwind.config.ts"))
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "src", "index.css"))

    def test_links_theater_font(self):
        assert "family=Limelight" in self.html

    def test_links_styles_css(self):
        assert 'href="styles.css"' in self.html

    def test_links_script_js(self):
        assert 'src="/script.js"' in self.html
        assert 'src="/src/main.tsx"' in self.html

    def test_mounts_react_projects(self):
        assert 'id="projects-root"' in self.html

    def test_has_cinematic_section(self):
        assert 'id="cinematic"' in self.html

    def test_has_resume_section(self):
        assert 'id="resume"' in self.html

    def test_has_frame_container(self):
        assert 'id="frame-container"' in self.html
        assert 'id="frame-canvas"' in self.html

    def test_uses_motion_package(self):
        assert '"motion": "https://cdn.jsdelivr.net/npm/motion@12.37.0/+esm"' in self.html
        assert 'type="module" src="/script.js"' in self.html

    def test_links_cinematic_video_frames(self):
        assert 'data-frame-count="169"' in self.html
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "public", "assets", "cinematic-frames", "frame-0001.jpg"))

    def test_text_overlays_present(self):
        assert self.html.count('class="text-overlay') >= 5

    def test_text_content_parth(self):
        assert "Parth" in self.html
        assert "Kevadiya" in self.html

    def test_text_content_ai_engineer(self):
        assert "Data-Driven" in self.html
        assert "AI Engineer" in self.html

    def test_text_content_architecting(self):
        assert "EVIDENCE" in self.html
        assert "Jensen Huang" in self.html

    def test_text_content_fullstack(self):
        assert "Full-Stack" in self.html
        assert "ML Specialist" in self.html

    def test_experience_cards(self):
        assert 'id="about-root"' in self.html
        assert "Work Experience" in self.html

    def test_experience_gallery_ui(self):
        assert 'id="projects-root"' in self.html
        assert 'id="skills-root"' in self.html
        assert 'id="contact-root"' in self.html

    def test_skills_listed(self):
        assert 'id="skills-root"' in self.html

    def test_preloader_exists(self):
        assert 'id="preloader"' in self.html

    def test_dark_theme(self):
        assert "bg-black" in self.html or "bg-neutral-950" in self.html


# --- styles.css tests ---
class TestStylesCSS:
    def setup_method(self):
        self.css = read_file("styles.css")

    def test_file_exists(self):
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "styles.css"))

    def test_has_skill_tag_styles(self):
        assert ".skill-tag" in self.css

    def test_has_resume_reveal(self):
        assert ".resume-reveal" in self.css

    def test_has_text_overlay(self):
        assert ".text-overlay" in self.css

    def test_experience_gallery_styles(self):
        assert ".experience-stage" in self.css
        assert ".experience-card[data-state=\"active\"]" in self.css
        assert ".experience-control" in self.css

    def test_text_overlay_uses_theater_font(self):
        assert "'Limelight'" in self.css

    def test_original_title_keeps_previous_font(self):
        assert "original-title" in self.css
        assert "'Playfair Display'" in self.css
        assert "'Inter'" in self.css

    def test_has_preloader(self):
        assert "#preloader" in self.css or ".loader-ring" in self.css

    def test_responsive_styles(self):
        assert "@media" in self.css


# --- script.js tests ---
class TestScriptJS:
    def setup_method(self):
        self.js = read_file("script.js")

    def test_file_exists(self):
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "script.js"))

    def test_uses_local_video_not_placeholder_images(self):
        urls = re.findall(r'https://static\.prod-images\.emergentagent\.com[^"]+', self.js)
        assert len(urls) == 0, f"Expected no placeholder image URLs, got {len(urls)}"
        assert "cinematic-frames" in self.js

    def test_imports_motion_scroll_values(self):
        assert 'from "motion"' in self.js
        assert "motionValue" in self.js
        assert "springValue" in self.js

    def test_uses_motion_scroll(self):
        assert "scroll(()" in self.js
        assert "getCinematicProgress()" in self.js

    def test_has_text_ranges(self):
        assert "TEXT_RANGES" in self.js

    def test_preload_frames_function(self):
        assert "preloadFrames" in self.js

    def test_scroll_smooths_frame_sequence(self):
        assert "FRAME_COUNT = 169" in self.js
        assert "renderFrame" in self.js
        assert "rawProgress.set(getCinematicProgress())" in self.js

    def test_update_text_overlays_function(self):
        assert "updateTextOverlays" in self.js

    def test_experience_gallery_script(self):
        assert "initExperienceGallery" in self.js
        assert "data-experience-card" in self.js
        assert "data-experience-next" in self.js

    def test_frame_index_mapping(self):
        assert "Math.round(clamped * (FRAME_COUNT - 1))" in self.js
        assert "drawFrame(frameImages[index])" in self.js
        assert "frameContext.drawImage" in self.js

    def test_uses_canvas_to_avoid_frame_swap_flicker(self):
        assert "frame-canvas" in self.js
        assert "resizeFrameCanvas" in self.js
        assert "frameImg.src" not in self.js

    def test_generated_frames_exist(self):
        frames_dir = os.path.join(PORTFOLIO_DIR, "public", "assets", "cinematic-frames")
        frames = [name for name in os.listdir(frames_dir) if name.endswith(".jpg")]
        assert len(frames) == 169


class TestReactProjectStructure:
    def setup_method(self):
        self.component = read_file(os.path.join("components", "ui", "expand-cards.tsx"))
        self.main = read_file(os.path.join("src", "main.tsx"))
        self.tailwind = read_file("tailwind.config.ts")
        self.components_json = read_file("components.json")

    def test_shadcn_default_component_path_exists(self):
        assert os.path.isdir(os.path.join(PORTFOLIO_DIR, "components", "ui"))
        assert os.path.isfile(os.path.join(PORTFOLIO_DIR, "components", "ui", "expand-cards.tsx"))

    def test_expand_cards_uses_react_state(self):
        assert '"use client"' in self.component
        assert "useState" in self.component
        assert "expandedImage" in self.component

    def test_work_experience_component_displays_roles(self):
        component = read_file(os.path.join("components", "ui", "connoisseur-stack-interactor.tsx"))
        for value in ["TI Automotive", "Centennial College", "Remarks Skill", "Data Analyst", "Full-Stack Developer", "ML Intern"]:
            assert value in component

    def test_skills_component_lists_core_skills(self):
        component = read_file(os.path.join("components", "ui", "logos3.tsx"))
        for skill in ["Python", "C#", "React", "Docker", "TensorFlow", "AWS"]:
            assert skill in component

    def test_expand_cards_displays_projects(self):
        for project in ["AI Scheduler", "Lid Harmonium", "MicroFish", "car-ed", "TraceTrust AI"]:
            assert project in self.component

    def test_expand_cards_uses_unsplash_images(self):
        assert self.component.count("https://images.unsplash.com/") >= 9

    def test_react_mount_imports_component(self):
        assert 'from "../components/ui/expand-cards"' in self.main
        assert 'getElementById("projects-root")' in self.main

    def test_tailwind_scans_components(self):
        assert './components/**/*.{ts,tsx}' in self.tailwind

    def test_components_json_points_to_components_ui(self):
        assert '"tsx": true' in self.components_json
        assert '"ui": "@/components/ui"' in self.components_json
