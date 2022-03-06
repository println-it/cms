import {
    buildProperty,
    buildSchema,
} from "@camberi/firecms";

import Page from '../entities/Page'

const PageSchema = buildSchema({
    customId: true,
    name: "Locale",
    properties: {
        name: buildProperty({
            title: "Name",
            dataType: "string",
        }),
        content: buildProperty({
            title: "Content",
            validation: { required: true },
            dataType: "array",
            of: {
                title: "Map",
                dataType: "map",
                properties: {
                    name: buildProperty({
                        title: "name",
                        dataType: "string"
                    }),
                    content: buildProperty({
                        title: "Content",
                        dataType: "array",
                        oneOf: {
                            typeField: "type",
                            valueField: "value",
                            properties: {
                                text: buildProperty({
                                    dataType: "string",
                                    title: "Text",
                                    config: {
                                        markdown: true
                                    },
                                }),
                                images: buildProperty({
                                    title: "Images",
                                    dataType: "array",
                                    of: buildProperty({
                                        dataType: "string",
                                        config: {
                                            storageMeta: {
                                                mediaType: "image",
                                                storagePath: "images",
                                                acceptedFiles: ["image/*"],
                                                metadata: {
                                                    cacheControl: "max-age=1000000"
                                                }
                                            }
                                        }
                                    }),
                                    description: "This fields allows uploading multiple images at once and reordering"
                                }),
                             }
                            }
                    }),
                }
            }
        })

            // oneOf: {
            //     typeField: "type", // you can ommit these `typeField` and `valueField` props to use the defaults
            //     valueField: "value",
            //     properties: {
            //         map_array_ref: {
            //             title: "Map",
            //             dataType: "map",
            //             properties: {
            //                 name: buildProperty({
            //                     title: "Name",
            //                     dataType: "string",
            //                 }),
                            // content: buildProperty({
                            //     title: "Content",
                            //     dataType: "array",
                            //     oneOf: {
                            //         typeField: "type",
                            //         valueField: "value",
                            //         properties: {
                            //             text: buildProperty({
                            //                 dataType: "string",
                            //                 title: "Text",
                            //                 config: {
                            //                     markdown: true
                            //                 },
                            //             }),
                            //             images: buildProperty({
                            //                 title: "Images",
                            //                 dataType: "array",
                            //                 of: buildProperty({
                            //                     dataType: "string",
                            //                     config: {
                            //                         storageMeta: {
                            //                             mediaType: "image",
                            //                             storagePath: "images",
                            //                             acceptedFiles: ["image/*"],
                            //                             metadata: {
                            //                                 cacheControl: "max-age=1000000"
                            //                             }
                            //                         }
                            //                     }
                            //                 }),
                            //                 description: "This fields allows uploading multiple images at once and reordering"
                            //             }),
                            //          }
                            //         }
                            // }),
            //             }
            //         }
            //     }
            // }
    }
});

export default PageSchema