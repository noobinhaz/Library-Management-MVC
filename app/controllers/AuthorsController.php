<?php
namespace App\Controllers;
use App\Controllers\BaseController;
use App\Helpers\ValidationRules as Validate;
use App\Models\Author;
use Core\Middleware\AuthMiddleware;
class AuthorsController extends BaseController{

    public $request;
    private $model;

    public function __construct($request){
        $authMiddleware = new AuthMiddleware();
        $authMiddleware->handle();
        $this->request = $request;
        $this->model = new Author();
        parent::__construct($this->model, $request);
    }

    public function getValidationRules(): array {
        return [
            'name' => function ($value) {
                return Validate::string($value, true);
            },
            'dob' => function ($value) {
                return Validate::date($value, true);
            },
        ];
    }

    public function author_with_books($id){
        $data = $this->model->getAuthorBooks($id);
        http_response_code(200);
        echo json_encode([
            'isSuccess' => $data !== null,
            'message'   => $data !== null ? '' : 'No Data Found',
            'data'      => ['data' => $data ]
        ]);
    }

}