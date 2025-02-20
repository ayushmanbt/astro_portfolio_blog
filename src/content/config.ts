import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        description: z.string(),
        published: z.boolean(),
        published_at: z.date(),
        hero: z.object(
            {
                src: z.string(),
                alt: z.string()
            }
        ).optional()
    })
})

const classNoteCollection = defineCollection({
    
})

export const collections = {
    'blog': blogCollection
}