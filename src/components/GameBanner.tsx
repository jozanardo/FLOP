import * as Dialog from  '@radix-ui/react-dialog'
import { AdsScreen } from './screens/AdsScreen';

export interface GameBannerProps {
    id: string;
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="relative rounded-lg overflow-hidden">
                <img  src={props.bannerUrl} alt=""/>

                <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                    <strong className="font-bold text-white block">{props.title}</strong>
                    <span className="text-zinc-300 text-sm block ">{props.adsCount} anúncio(s)</span>
                </div>
            </Dialog.Trigger>

            
            
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                    <Dialog.Content className="fixed bg-black/95 pt-8 pb-24 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className="text-3xl text-white font-black">{props.title}</Dialog.Title>
                            <AdsScreen 
                                key={props.id} 
                                id={props.id}
                                bannerUrl={props.bannerUrl} 
                                title={props.title} 
                                adsCount={props.adsCount} 
                                />
                    </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}