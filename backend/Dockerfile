FROM node:23.5.0-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/schema/package.json ./packages/schema/
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY backend/package.json ./backend/

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY packages/schema ./packages/schema
COPY packages/tsconfig ./packages/tsconfig
COPY backend ./backend

RUN pnpm -F schema build && \
    pnpm -F backend build

FROM node:23.5.0-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/schema/package.json ./packages/schema/
COPY backend/package.json ./backend/

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install -F backend -P --frozen-lockfile && \
    pnpm install -F schema -P --frozen-lockfile

FROM node:23.5.0-alpine AS runtime

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/packages/schema/dist ./packages/schema

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/schema/node_modules ./packages/schema/node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "backend/dist/index.js"]