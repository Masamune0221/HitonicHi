import ContentCard from '../components/layout/ContentCard';
import { BubbleBackground } from '../components/animate-ui/components/backgrounds/bubble';

export default function PrivacyPolicyPage() {
  return (
    <BubbleBackground className="w-screen h-min-screen">
      <div className="w-[95%] md:max-w-3xl mx-auto py-10 flex justify-center items-center min-h-screen">
        <ContentCard className="p-4 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-6 border-b border-white/20 pb-2">
            プライバシーポリシー
          </h1>          
          <div className="space-y-6 md:space-y-8 text-white/80 leading-relaxed text-xs md:text-sm">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. 個人情報の収集について</h2>
              <p>
                本サービスでは、ユーザー登録時に設定されたニックネーム、および投稿された日記内容を収集します。これらの情報は、サービスの提供およびAIによるフィードバック生成の目的でのみ使用されます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. AI（人工知能）の利用とデータの取り扱いについて</h2>
              <p>
                本サービスは、Google Gemini API（無料枠）を利用して日記内容の解析と返信の生成を行っています。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li><span className="font-semibold">データの学習利用に関する同意:</span> <br/>Google社の規約に基づき、入力された内容はGoogle社によってサービスの利便性向上やモデルの改善（学習等）に利用される場合があります。機密性の高い情報の入力には十分ご注意ください。</li>
                <li><span className="font-semibold">外部送信:</span><br/> 投稿された内容は、解析のためにGoogle社のサーバーへ送信されます。<br/>詳細な取り扱いは、同社の<a href="https://policies.google.com/privacy" className="text-blue-800 hover:text-hitonichi-primary">プライバシーポリシー</a>および<a href="https://ai.google.dev/gemini-api/terms?hl=ja" className="text-blue-800 hover:text-hitonichi-primary">利用規約</a>に従います。</li>
                <li><span className="font-semibold">入力に関する注意:</span><br/> AIは個人情報（氏名、住所、電話番号等）を適切に判別できない場合があるため、これらの具体的な情報の入力は控えていただくようお願いします。</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. データの管理と第三者提供</h2>
              <p>
                法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。<br/>日記データは暗号化された通信を通じて安全に管理されます。
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. 免責事項</h2>
              <p>
                本サービスの利用により生じた損害について、管理者は一切の責任を負いません。AIの回答に基づいた行動は、ユーザー自身の判断で行ってください。<br/>また、本サービスは予告なく内容の変更、中断、または終了することがあります。
              </p>
            </section>
          </div>
        </ContentCard>
      </div>
    </BubbleBackground>
  );
}
