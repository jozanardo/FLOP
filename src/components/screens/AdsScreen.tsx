import * as Dialog from  '@radix-ui/react-dialog'
import { GameBannerProps } from "../GameBanner";
import { useEffect, useState } from 'react';
import { GameController, CheckCircle } from "phosphor-react";
import axios from 'axios'

interface Ads {
    id: string;
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekDays: string;
    hourStart: string;
    hourEnd: number;
    useVoiceChannel: boolean;
    createdAt: Date;
}

export function AdsScreen (props: GameBannerProps) {

    const [ads, setAds] = useState<Ads[]>([])
    const [Id, setId] = useState("7aad4ec3-0556-436b-b622-84328a9e9fe0")
    const [discord, setDiscord] = useState("")

    useEffect(() => {
        axios(`http://localhost:8080/games/${props.id}/ads`)
        .then(response => {
            setAds(response.data)
      })
    },[])

    function getDiscordByIdAd(Ids:String) {
        fetch(`http://localhost:8080/ads/${Ids}/discord`)
        .then(response => response.json())
        .then(data => {
            setDiscord(data.discord)})
    }

    return (  
        <div className="relative">
            <div className="mt-2 text-zinc-400">
                {ads.length ? <span>Conecte-se e comece a jogar!</span> : <span></span>}
                
            </div> 
            
            <div className="grid grid-flow-col auto-cols-[67%] gap-6 overflow-x-auto mt-8 pb-6 scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-violet-200">
            {!ads.length 
            ? 
                <div className="relative rounded-lg overflow-hidden h-[120px]">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 w-[320px] bg-[#2A2634] p-8 rounded-lg text-zinc-400">
                        <span>Infelizmente ainda não há anúncios cadastrados para esse jogo :c</span> 
                    </div>
                </div>
            : ads.map(ad => {
                let color = ad.useVoiceChannel ? "text-emerald-400" : "text-red-400";
                return (
                    <div className="relative rounded-lg overflow-hidden" key={ad.id}>
                        <div className="w-full h-[394px] bg-[#2A2634]">
                            <div className="pt-6 px-8">
                                <span className="text-zinc-400">Nome</span><br/>
                                <strong className="font-bold over">{ad.name}</strong>
                            </div>

                            <div className="pt-6 px-8">
                                <span className="text-zinc-400">Tempo de jogo</span><br/>
                                <strong className="font-bold">{ad.yearsPlaying} ano(s)</strong>
                            </div>

                            <div className="pt-6 px-8">
                                <span className="text-zinc-400">Disponibilidade</span><br/>
                                <strong className="font-bold">{ad.weekDays.length} dia(s) • {ad.hourStart}h - {ad.hourEnd}h</strong>
                            </div>

                            <div className="pt-6 px-8">
                                <span className="text-zinc-400">Chamada de aúdio?</span><br/>
                                <span className={color}>{ad.useVoiceChannel ? "Sim" : "Não"}</span>                                
                            </div>

                            <Dialog.Root>
                                <Dialog.Trigger onClick={event => getDiscordByIdAd(ad.id)} className="pt-6 px-8 w-full relative rounded-lg overflow-hidden">
                                    <div className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 hover:scale-[1.05]">
                                        <GameController className="w-6 h-6"/>Encontrar duo</div>
                                </Dialog.Trigger> 
                            

                                <Dialog.Portal>

                                <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-[312px]">
                                        <Dialog.Title></Dialog.Title>
                                        <Dialog.Close className="absolute right-5 top-4 text-zinc-400 ">X</Dialog.Close>
                                            <div className="flex justify-center">
                                                <CheckCircle size={64} color="#34D399"/> 
                                            </div>

                                            <div className="flex flex-col items-center justify-center pt-6 pb-8">
                                                <strong className="text-2xl">Let's play!</strong> 
                                                <span className="text-zinc-400 text-[16px]">
                                                    Agora é só começar a jogar!    
                                                </span> 
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <strong className="text-[16px] text-sm">Adicione no Discord</strong> 
                                                <div className="w-[230px] bg-zinc-900 text-zinc-200 flex items-center justify-center py-3 mt-3 rounded-lg">
                                                    {discord}
                                                </div>
                                            </div>

                                        </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>

                        </div>
                    </div>
                )
            })} 
            
            </div>  
            <Dialog.Close className="absolute right-0 bg-zinc-500 mt-6 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 hover:scale-[1.05]">Voltar</Dialog.Close>
        </div> 
    )
}