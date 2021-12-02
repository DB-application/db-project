import {Note} from "../workspace/viewmodel/notes/notes";
import {generateUuid} from "../core/uuid/generateUuid";
import {JSONContent} from "@tiptap/react";


function getNotes(): Promise<Array<Note>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    noteId: '1',
                    title: 'Заметка 1 Заметка 1 Заметка 1 ',
                },
                {
                    noteId: '3',
                    title: 'Заметка 3',
                },
                {
                    noteId: '2',
                    title: 'Заметка 2',
                },
            ])
        }, 1000)
    })
    // return fetch('/notes', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type CreateNoteData = {
    title: string,
    createdBy: string,
}

function createNote(noteData: CreateNoteData): Promise<{noteId: string}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({noteId: generateUuid()})
        }, 1000)
    })
    // return fetch('/create/note', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(noteData)
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type EditNoteContentData = {
    noteId: string,
    content: Object,
}

function editNoteContent(payload: EditNoteContentData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    // return fetch('/edit/note_content', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload)
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type EditTitleContentData = {
    noteId: string,
    title: string,
}

function editNoteTitle(payload: EditTitleContentData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    // return fetch('/edit/note_content', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload)
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

type NoteContent = {
    content: JSONContent,
    title: string,
}

function getNoteContent(noteId: string): Promise<NoteContent> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                content: {
                    type: 'doc',
                    content: [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Example "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "bold"
                                        }
                                    ],
                                    "text": "Text"
                                }
                            ]
                        }
                    ]
                },
                title: 'Новая записка',
            })
        }, 1000)
    })
    // return fetch('/remove/note', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         noteId,
    //     })
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

function removeNote(noteId: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    // return fetch('/remove/note', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         noteId,
    //     })
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return Promise.resolve(response)
    //             case HttpStatus.UNAUTHORIZED:
    //                 goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response)
    //         }
    //     })
}

const NotesApi = {
    getNotes,
    editNoteContent,
    removeNote,
    createNote,
    getNoteContent,
    editNoteTitle,
}

export type {
    NoteContent,
}

export {
    NotesApi,
}