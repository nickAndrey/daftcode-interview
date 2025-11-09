# Recruitment task

This project contains a **Vue 3 frontend** and a **Express.js backend**, both fully Dockerized and runnable with a single command.

### Features implemented

- **Search with debounce** (input + live filtering)
- **Results list** with per-item loading state
- **Pokemon details modal** (image, name, description, and link to details)
- **Dedicated details page** with:
  - basic info (height, weight, XP, abilities)
  - visual stats display (progress bars)
  - dynamic color styling based on Pokemon species color
- **Backend proxy** with cache and pseudo API key validation
- **Dockerized** environment (frontend + backend)
- **Single-command run:** `npm run docker:dev` or `npm run docker:prod`

> ### Search behavior
> - On first load, the UI displays a list of the **most recognizable Pokémon** (e.g. Pikachu, Charizard, Eevee…).
> - When typing in the search bar, results update using **incremental alphabetical search** (e.g. `a` → `ab` → `abra`), showing Pokémon whose names start with the entered letters.

---

### Environment

- Docker Desktop: 4.50.0 (209931)
- Docker Compose: v2.40.3-desktop.1
- Node.js (local): v22.x
- Node.js (Docker): node:24.11.0-alpine

---

### Clone the repo

```bash
git clone https://github.com/nickAndrey/dafcode-test.git
cd dafcode-test && npm i
```

---

### Run project

```bash
`npm run docker:dev` — to run development mode
`npm run docker:prod` — to build and run prod
`npm run docker:down` — to shut down container
`npm run docker:clean` — to remove container and images
```

---

### Note on architecture

The task description didn’t specify a required project structure, so I decided to implement it as a monorepo (frontend + backend + Docker configs in one workspace).

Everything for simplicity.
