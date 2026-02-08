import { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ContentCard from '../components/layout/ContentCard';
import { dairyApi } from '../api/client';

export default function Dairies() {
  const [dairiesGrouped, setDairiesGrouped] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchDairies = async () => {
      setIsLoading(true);
      try {
        // 2秒待機（ユーザーの要望通り、一貫性を持たせる）
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        const [data] = await Promise.all([
          dairyApi.index(),
          minLoadingTime
        ]);
        
        setDairiesGrouped(data);
        
        // 最初の月をデフォルトのタブに設定
        const months = Object.keys(data);
        if (months.length > 0) {
          setActiveTab(months[0]);
        }
      } catch (error) {
        console.error('Failed to fetch diaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDairies();
  }, []);

  const months = Object.keys(dairiesGrouped);

  return (
    <MainLayout>
      <div className="space-y-6">
        <ContentCard title="過去の日記">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : months.length === 0 ? (
            <div className="text-center py-10 text-white/60">
              まだ日記がありません。今日から始めてみませんか？
            </div>
          ) : (
            <div className="space-y-6">
              {/* タブナビゲーション */}
              <div className="flex overflow-x-auto px-2 pb-2 space-x-2 scrollbar-hide">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setActiveTab(month)}
                    className={`px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                      activeTab === month
                        ? 'bg-hitonichi-primary text-white shadow-lg scale-105'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {month.replace('-', '年')}月
                  </button>
                ))}
              </div>

              {/* 日記リスト */}
              <div className="grid gap-4">
                {dairiesGrouped[activeTab]?.map((dairy) => (
                  <div
                    key={dairy.id}
                    className="bg-gray-500/30 backdrop-blur-sm rounded-xl p-6 border border-white/20  hover:bg-gray-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-medium text-white/60">
                        {new Date(dairy.date).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </span>
                    </div>
                    <p className="text-white whitespace-pre-wrap leading-relaxed">
                      {dairy.content}
                    </p>
                    <div className='w-full border-b border-white/30 my-4'/>
                    <p className="text-xl font-medium text-white/70 mb-2">Hitonichiからの返信</p>
                    <span className="text-md font-medium text-white/60">
                      {dairy.ai_response ?? '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ContentCard>
      </div>
    </MainLayout>
  );
}