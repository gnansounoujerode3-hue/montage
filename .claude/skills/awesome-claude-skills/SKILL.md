---
name: awesome-claude-skills
description: Use when someone asks to discover, compare, or choose additional Claude Code or Agent Skills, or asks what other skills are available. Consults the Awesome Claude Skills catalog and recommends reviewing each source before installation.
---

# Awesome Claude Skills — discovery catalog

The upstream **Awesome Claude Skills** project is a curated directory of links and resources, not a runnable skill package with its own `SKILL.md`.

- Upstream catalog: <https://github.com/travisvn/awesome-claude-skills>
- Installed project skills and their source repositories: see `SKILLS.md` at the repository root and `skills-lock.json`.

When helping someone choose another skill:

1. Search the upstream catalog for a relevant, actively maintained source.
2. Explain what the skill does and where it comes from.
3. Review the source instructions, scripts, dependencies, and license before installing it.
4. Do not install additional skills unless the user asks for the installation.

This small local wrapper is provided so Claude Code can invoke the catalog workflow. It does not copy or claim ownership of the upstream catalog contents.
