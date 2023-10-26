<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class NotFoundException extends Exception
{
    protected $code = 404;

    /**
     * Report or log an exception.
     *
     * @return void
     */
    public function report()
    {
    }

    public function render(Request $request)
    {
        return response()->json([
            'error' => $this->getMessage()
        ], $this->code);
    }
}
