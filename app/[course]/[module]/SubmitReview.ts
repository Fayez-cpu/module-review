"use server"
import { auth } from "@/auth"
import { success } from "zod/v4"
import { prisma } from '@/lib/prisma'

export default async function SubmitReview(formData){
    const session = await auth()
    if (!session?.user){
        return {message: "You must be signed in", success: false}
    }
    if (!session?.user?.course){
        return {message: "You haven't selected your course yet", success: false}
    }


    const moduleId = formData.get("moduleId")
    const teachingRating = formData.get("teachingRating")
    const assessmentRating = formData.get("assessmentRating")
    const supportRating = formData.get("supportRating")
    let feedback
    if (formData["feedback"]){
        console.log("feedback exists")
        feedback = formData["feedback"]
    }
    console.log("feedback doesn't exist")



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

     return {message: "Review submitted!", success: true}

}