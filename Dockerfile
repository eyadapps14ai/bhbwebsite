# BHB website on Cloud Run: build the static site, then serve it with server.mjs (no dependencies).
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npx --yes pnpm@10 install --frozen-lockfile
COPY . .
# The dashboard that receives enquiries and serves /admin. Override with --build-arg.
ARG BHB_DASHBOARD_URL=https://bhb-dashboard-552796549284.us-east5.run.app
ARG BHB_SITE_URL=https://www.bhbcentre.com
RUN BHB_DASHBOARD_URL=$BHB_DASHBOARD_URL BHB_SITE_URL=$BHB_SITE_URL npx --yes pnpm@10 run build

FROM node:24-alpine
WORKDIR /app
ARG BHB_DASHBOARD_URL=https://bhb-dashboard-552796549284.us-east5.run.app
ENV NODE_ENV=production BHB_DASHBOARD_URL=$BHB_DASHBOARD_URL
COPY --from=build /app/dist ./dist
COPY server.mjs ./
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
