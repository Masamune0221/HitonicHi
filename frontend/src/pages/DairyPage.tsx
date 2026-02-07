import { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ContentCard from '../components/layout/ContentCard';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {dairySchema, type DairyFormData} from '../zod/dairy';
import { dairyApi } from '../api/client';
import { toast } from 'sonner';
import { TypeWriter } from '@/components/TypeWriter';


export default function Dairy() {
  // 今日の日付を取得
  const today = new Date();
  const formattedDate = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const [todayStatus, setTodayStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors },reset } = useForm<DairyFormData>({
      resolver: zodResolver(dairySchema),
    });
  const onSubmit = (data: DairyFormData) => {
      dairyApi.create(data.content)
      .then((res) => {
        toast.success('日記の作成に成功しました')
        setTodayStatus(true)
        reset()
        setAiResponse(res.ai_response)
      })
      .catch(err => {
        const errorMessage = err.status === 500 
          ? 'サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。'
          : err.message || 'エラーが発生しました';
        toast.error(
          <div>
            <div>日記の作成に失敗しました</div>
            <div className="text-sm mt-1">{errorMessage}</div>
          </div>
        )
      })
  };

  // 今日の日記を記載したか判定する
  useEffect(() => {
    setIsLoading(true);
    
    // 最小ローディング時間を2秒に設定
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
    
    Promise.all([
      dairyApi.today(),
      minLoadingTime
    ])
    .then(([data]) => {
      setTodayStatus(data === true);
    })
    .catch(err => {
      console.error('今日の日記取得エラー:', err);
      setTodayStatus(false);
    })
    .finally(() => {
      setIsLoading(false);
    });
  },[])

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 日付表示 */}
        <ContentCard>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">今日の日付</p>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              {formattedDate}
            </h2>
          </div>
        </ContentCard>
        {/* 日記投稿エリア */}
        {isLoading ? (
          <ContentCard title="今日の日記を書く">
            <div className="animate-pulse space-y-4">
              <div className="w-full h-64 bg-white/20 rounded-lg"></div>
              <div className="flex justify-end">
                <div className="w-24 h-11 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          </ContentCard>
        ) : todayStatus ? (
         <ContentCard title="今日の日記を書く">
            <p className="text-center text-white/80">今日は日記を書きました。また明日....</p>
          </ContentCard>
        ) : (
           <ContentCard title="今日の日記を書く">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <textarea
              {...register('content')}
              className="w-full h-64 p-4 bg-hitonichi-primary/40 backdrop-blur-sm rounded-lg border border-hitonichi-border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
              placeholder="今日はどんな一日でしたか?&#10;&#10;あなたの気持ちを自由に書いてください..."
            />
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            
            {/* AI利用に関する注釈 */}
            <div className="p-3 bg-white/40 rounded-md border border-white/10">
              <p className="text-[11px] text-gray/60 leading-relaxed">
                ※ 入力された内容はAI（Google Gemini）によって解析され、返信が生成されます。
                名前や住所などの個人情報の入力はお控えください。<br/>
                また、AIは誤った情報を生成する可能性があります。
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="px-8 py-3 bg-hitonichi-primary hover:bg-hitonichi-primary/80 text-white font-medium rounded-lg transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl">
                投稿する
              </button>
            </div>
          </div>
          </form>
        </ContentCard>
        )}
        {/* AIの返信エリア */}
        {aiResponse && (
          <ContentCard title="Hitonichiからの返信">
            <TypeWriter text={aiResponse} />
          </ContentCard>
        )}
      </div>
    </MainLayout>
  );
}