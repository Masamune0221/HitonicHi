import { BubbleBackground } from '../components/animate-ui/components/backgrounds/bubble';
import ContentCard from '../components/layout/ContentCard';
export default function Error(){
    return (
         <BubbleBackground className="w-screen h-screen">
             <div className='w-[90%] md:w-2/3 flex flex-col justify-center items-center min-h-screen py-10 mx-auto'>
             <ContentCard className='flex w-full min-h-[40vh] text-center justify-center items-center'>
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