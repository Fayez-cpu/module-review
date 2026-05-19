"use server"
import { auth } from "@/auth"
import { prisma } from '@/lib/prisma'

export default async function SubmitReview(formData: FormData){
    const session = await auth()
    if (!session?.user){
        return {message: "You must be signed in", success: false}
    }
    if (!session?.user?.course){
        return {message: "You haven't selected your course yet", success: false}
    }


    const moduleId = formData.get("moduleId") as string
    const teachingRating = Number(formData.get("teachingRating"))
    const assessmentRating = Number(formData.get("assessmentRating"))
    const contentRating = Number(formData.get("contentRating"))
    const supportRating = Number(formData.get("supportRating"))
    
    const ratings = [teachingRating, assessmentRating, contentRating, supportRating]
    for (let i = 0; i < ratings.length; i++){
        if (ratings[i] < 1 || ratings[i] > 5){
            return {message: "Ratings must be between 1 and 5!", success: false}
        }
    }

    const feedback = (formData.get("feedback") as string) || null
    console.log(typeof teachingRating)
    const moduleDetails = await prisma.module.findUnique({
        where: {id: moduleId},
        include: {
            courseModules: {
                include: {
                    course: {
                        select: {name: true}
                    }
                }
            }
        }

    })
    moduleDetails["courseModules"] = moduleDetails?.courseModules.map(cs => cs.course)
    console.log(moduleDetails["courseModules"])

    const courseMatches = moduleDetails?.courseModules.some((course) => course.name === session?.user?.course)
    if (!courseMatches){
        return {message: "You can only review modules from you course", success: false}
    }

    const reviewCount= moduleDetails["reviewCount"]

    const newTeachingRating = Number(((moduleDetails["teachingRating"] * reviewCount) + teachingRating) / (reviewCount + 1))
    const newAssessmentRating = Number(((moduleDetails["assessmentRating"] * reviewCount) + assessmentRating) / (reviewCount + 1))
    const newContentRating = Number(((moduleDetails["contentRating"] * reviewCount) + contentRating) / (reviewCount + 1))
    const newSupportRating = Number(((moduleDetails["supportRating"] * reviewCount) + supportRating) / (reviewCount + 1))
    const overallRating = ((newTeachingRating + newAssessmentRating + newContentRating + newSupportRating) / 4)
    const newOverallRating =  ((Number(moduleDetails["overallRating"]) * reviewCount) + overallRating) / (reviewCount + 1)
    

    try{
        const result = await prisma.review.create({
            data: {
            userId: session.user.id,
            moduleId: moduleDetails["id"],
            teachingRating,
            assessmentRating,
            contentRating,
            supportRating,
            overallRating: Number(overallRating.toFixed(2)),
            feedback
            }
        })
        const updateModule = await prisma.module.update({
            where: {id: moduleId},
            data: {
                teachingRating: Number(newTeachingRating.toFixed(2)),
                assessmentRating: Number(newAssessmentRating.toFixed(2)),
                contentRating: Number(newContentRating.toFixed(2)),
                supportRating: Number(newSupportRating.toFixed(2)),
                overallRating: Number(newOverallRating.toFixed(2)),
                reviewCount: reviewCount + 1                
            }
        })

        if (result && updateModule){
            return {message: "Your review was saved!", success: true}
        }
    }
    catch (error) {
        console.log(error)
        return {message: "Unable to save review", success: false}
    }

}