import { BubbleBackground } from '../components/animate-ui/components/backgrounds/bubble';
import ContentCard from '../components/layout/ContentCard';
export default function Error(){
    return (
         <BubbleBackground className="w-screen h-screen">
            <div className='flex flex-col justify-center items-center h-full w-1/2 mx-auto'>
            <ContentCard className=' flex w-full h-1/2 text-center justify-center items-center'>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white tracking-wide">
                    404エラー
                </h2>
                <p className="text-white/80 text-sm mb-2">ページが見つかりませんでした</p>
            </div>
          </ContentCard>
          </div>
        </BubbleBackground>
    );
}