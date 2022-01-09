import {Note} from "../workspace/viewmodel/notes/notes";
import {JSONContent} from "@tiptap/react";
import {HttpStatus} from "../core/http/HttpStatus";
import {goToUrl} from "../core/link/goToUrl";


function getNotes(workspaceId: string): Promise<Array<Note>> {
    return fetch('/list/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            workspaceId,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type CreateNoteData = {
    workspaceId: string,
    title: string,
}

function createNote(noteData: CreateNoteData): Promise<{noteId: string}> {
    return fetch('/create/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: noteData.title,
            workspaceId: noteData.workspaceId,
            content: '',
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type EditNoteContentData = {
    noteId: string,
    content: string,
}

function editNoteContent(payload: EditNoteContentData) {
    return fetch('/edit/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type EditTitleContentData = {
    noteId: string,
    title: string,
}

function editNoteTitle(payload: EditTitleContentData) {
    return fetch('/rename/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type NoteContent = {
    content: string,
    title: string,
}

function getNoteContent(noteId: string): Promise<NoteContent> {
    return fetch('/get/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            noteId,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function removeNote(noteId: string) {
    return fetch('/remove/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            noteId,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
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