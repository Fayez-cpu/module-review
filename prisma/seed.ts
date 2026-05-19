// prisma/seed.ts
// Add this after your Computer Science seeding code

import { prisma } from '@/lib/prisma'

// ============================================
// Cyber Security Course
// ============================================

const cyberSecurity = await prisma.course.upsert({
  where: { slug: 'cyber-security' },
  update: {},
  create: {
    name: 'Cyber Security',
    slug: 'cyber-security',
    description: 'BSc Cyber Security degree programme',
  },
})

console.log('✅ Created course: Cyber Security')

// Year 1 - New modules unique to Cyber Security
const cyberYear1NewModules = [
  {
    name: 'Scripting and Web Technologies',
    slug: 'scripting-and-web-technologies',
    year: 1,
    credits: 15,
  },
]

// Year 2 - New modules
const cyberYear2NewModules = [
  {
    name: 'Ethical Hacking',
    slug: 'ethical-hacking',
    year: 2,
    credits: 15,
  },
  {
    name: 'Communication and Security Protocols',
    slug: 'communication-and-security-protocols',
    year: 2,
    credits: 15,
  },
]

// Year 3 - New modules
const cyberYear3NewModules = [
  {
    name: 'Artificial Intelligence for Security',
    slug: 'ai-for-security',
    year: 3,
    credits: 15,
  },
  {
    name: 'Security Architectures and Future Trends',
    slug: 'security-architectures-and-future-trends',
    year: 3,
    credits: 15,
  },
]

// Create all new Cyber Security modules
const allCyberNewModules = [
  ...cyberYear1NewModules,
  ...cyberYear2NewModules,
  ...cyberYear3NewModules,
]

for (const moduleData of allCyberNewModules) {
  const module = await prisma.module.upsert({
    where: { slug: moduleData.slug },
    update: {},
    create: moduleData,
  })

  // Link to Cyber Security course
  await prisma.courseModule.upsert({
    where: {
      courseId_moduleId: {
        courseId: cyberSecurity.id,
        moduleId: module.id,
      },
    },
    update: {},
    create: {
      courseId: cyberSecurity.id,
      moduleId: module.id,
    },
  })

  console.log(`✅ Created Cyber Security module: ${moduleData.name}`)
}

// Link existing CS modules to Cyber Security
const sharedModulesForCyber = [
  // Year 1 shared
  'logic-and-discrete-mathematics',
  'foundations-of-computer-and-it-systems',
  'fundamentals-of-networks-and-security',
  'computer-systems-data-structures-and-data-management',
  'programming',
  // Year 2 shared
  'software-engineering',
  'data-driven-systems',
  'legal-ethical-and-sustainability-issues',
  'team-project',
  // Year 3 shared
  'security-management',
  'individual-project',
  // Year 3 optional shared
  'abstract-interaction-methodologies',
  'frontiers-in-ai-and-data-science',
  'modelling-and-evaluating-emerging-technologies',
]

for (const moduleSlug of sharedModulesForCyber) {
  const module = await prisma.module.findUnique({
    where: { slug: moduleSlug }
  })

  if (module) {
    await prisma.courseModule.upsert({
      where: {
        courseId_moduleId: {
          courseId: cyberSecurity.id,
          moduleId: module.id,
        },
      },
      update: {},
      create: {
        courseId: cyberSecurity.id,
        moduleId: module.id,
      },
    })
    console.log(`✅ Linked existing module to Cyber Security: ${module.name}`)
  } else {
    console.log(`⚠️ Module not found: ${moduleSlug}`)
  }
}

console.log('🔒 Cyber Security course complete!')