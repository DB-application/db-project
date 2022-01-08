<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Exception;


use App\Workspace\Domain\Model\NoteId;

class InvalidNoteIdException extends \Exception
{
    public function __construct(NoteId $id)
    {
        parent::__construct("Note with id '$id' does not exists");
    }
}