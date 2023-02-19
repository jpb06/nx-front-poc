#!/bin/sh

set -ex
npx prisma migrate deploy --schema libs/backend/database/model/schema.prisma
npx prisma db seed
pnpm nx serve back-api-app