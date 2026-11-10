FROM node:20-slim

RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

RUN npm install -g @openai/codex

WORKDIR /workspace

CMD ["codex"]