<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\DairyRequest;
use App\Http\Services\DairyService;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class DairyController extends Controller
{
    private $dairyService;
    public function __construct(DairyService $dairyService){
        $this->dairyService = $dairyService;
    }

    /**
     * 今日の日記を取得する(Controller)
     * @return JsonResponse
     */
    public function today(){
        try{
            $dairy = $this->dairyService->today();
            return response()->json($dairy);
        }catch(Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => '日記の取得に失敗しました',
            ], 500);
        }
    }


    /**
     * 日記を作成する(Controller)
     * @param DairyRequest $request
     * @return JsonResponse
     */
    public function create(DairyRequest $request){
        try{
            $validated = $request->validated();
            $validated['user_id'] = $request->user()->id;
            $dairy = $this->dairyService->dairyCreate($validated);
            return response()->json($dairy);
        }catch(Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => '日記の作成に失敗しました',
            ], 500);
        }catch(ValidationException $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * 日記一覧を取得する(Controller)
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request){
        try{
            $dairies = $this->dairyService->getDairies($request->user()->id);
            return response()->json($dairies);
        }catch(Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message' => '日記の取得に失敗しました',
            ], 500);
        }
    }
}
