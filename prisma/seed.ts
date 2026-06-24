import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db'
})
const prisma = new PrismaClient({ adapter })

async function main () {
  await prisma.widget.deleteMany({})

  await prisma.widget.createMany({
    data: [
      {
        type: 'news',
        title: 'News Aggregator',
        colspan: 2,
        rowspan: 2
      },
      {
        type: 'clock',
        title: 'Digital Clock',
        colspan: 1,
        rowspan: 1
      },
      {
        type: 'weather',
        title: 'Weather Tracker',
        colspan: 1,
        rowspan: 2
      },
      {
        type: 'calendar',
        title: 'Calendar Events',
        colspan: 2,
        rowspan: 1
      },
      {
        type: 'links',
        title: 'Quick Links',
        colspan: 1,
        rowspan: 1
      }
    ]
  })

  console.log('Database seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
