<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Model;

interface NoteRepositoryInterface
{
    /**
     * @param NoteId $id
     * @return Note|null
     */
    public function findById(NoteId $id): ?Note;

    /**
     * @param string $name
     * @return Note|null
     */
    public function findByName(string $name): ?Note;

    /**
     * @param Note $note
     */
    public function add(Note $note): void;

    /**
     * @param Note $note
     */
    public function remove(Note $note): void;

    /**
     * @return NoteId
     */
    public function nextId(): NoteId;
}