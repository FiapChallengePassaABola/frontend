// src/pages/pageAdmin/routes/newsmanagerRoute/store/store.js
import VideoYT from "../../../../../assets/VideoYT.jpg";
import Foto1 from "../../../../../assets/Foto1.jpg";
import Foto2 from "../../../../../assets/Foto2.jpg";
import Foto3 from "../../../../../assets/Foto3.jpg";
import Foto4 from "../../../../../assets/Foto4.jpg";
import Foto5 from "../../../../../assets/Foto5.jpg";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialNoticias = [
  {
    img: Foto1,
    titulo: "PABCAST CONVIDA: KETLEN WIGGERS - FALA, BEBÊ #40",
    descricao:
      "No episódio de hoje temos uma convidada especial: a maior artilheira das Sereias da Vila e a mamãe do Lucca. Conversamos muito sobre maternidade e o esporte de alto rendimento, e a evolução de mais atletas mulheres no futebol como um todo. Vem conversar e debater com a gente :)",
    fonte: "PassaBola",
    tempoAtras: "há 8 minutos",
    temDescricao: true,
    categoria: "Internacional",
    views: 53,
  },
  {
    img: VideoYT,
    titulo: "COMO TEM SIDO NOSSOS PRIMEIROS MESES? - FALA, BEBÊ #39",
    descricao:
      "Voltamos pra contar como tem sido nossos dias desde a chegada da Antonella. Foram muitos aprendizados e momentos especiais, e claro que viemos dividir aqui com vocês. Mais uma montanha russa de emoções. Vem conversar e debater com a gente :)",
    fonte: "PassaBola",
    tempoAtras: "há 3 horas",
    temDescricao: true,
    categoria: "Internacional",
    views: 44,
  },
  {
    img: Foto2,
    titulo: "PABCAST CONVIDA: BIA MENEZES - FALA, BEBÊ #34",
    fonte: "PassaABola",
    descricao:
      "No episódio de hoje recebemos a Bia Menezes para um papo leve e inspirador sobre carreira, desafios e conquistas dentro e fora de campo. Uma conversa cheia de histórias, aprendizados e boas risadas. Vem acompanhar essa troca e refletir com a gente sobre o futebol feminino e seus bastidores :)",
    tempoAtras: "há 50 min",
    temDescricao: false,
    categoria: "Mercado",
    views: 23,
  },
  {
    img: Foto3,
    titulo: "Amanda Gutierres é vendida por valor recorde no Brasil",
    fonte: "PassaABola",
    tempoAtras: "há 5 horas",
    descricao:
      "Um marco histórico no futebol feminino! Amanda Gutierres foi negociada por um valor recorde, reforçando a valorização e o crescimento da modalidade no país. A atacante celebra uma nova etapa na carreira e inspira outras jogadoras a sonharem alto dentro do esporte. Vem entender essa transferência :)",
    temDescricao: false,
    categoria: "Seleções",
    views: 84,
  },
  {
    img: Foto4,
    titulo: "Vai começar a Libertadores Feminina 🔥",
    fonte: "PassaBola",
    tempoAtras: "há 9 horas",
    descricao:
      "Chegou a hora mais esperada da temporada! A Libertadores Feminina está de volta, reunindo os maiores clubes da América do Sul em busca da glória continental. Expectativas, rivalidades e muito talento em campo prometem fortes emoções. Vem acompanhar tudo com a gente :)",
    temDescricao: false,
    categoria: "Agenda",
    views: 45,
  },
  {
    img: Foto5,
    titulo: "História da Libertadores Feminina",
    fonte: "Gazeta Esportiva",
    tempoAtras: "há 8 horas",
    descricao:
      "Desde sua criação, a Libertadores Feminina se tornou símbolo de evolução e representatividade no futebol sul-americano. Ao longo dos anos, vimos jogadoras e clubes construírem histórias memoráveis, cheias de paixão e superação. Vem relembrar os momentos marcantes dessa trajetória :)",
    temDescricao: false,
    categoria: "Brasileirão",
    views: 37,
  },
];

export const useNoticiasStore = create(
  persist(
    (set) => ({
      noticias: initialNoticias,

      setNoticias: (newNoticias) => set({ noticias: newNoticias }),

      updateNoticia: (index, dadosAtualizados) =>
        set((state) => {
          const updated = [...state.noticias];
          updated[index] = { ...updated[index], ...dadosAtualizados };
          return { noticias: updated };
        }),

      addNoticia: (nova) =>
        set((state) => ({ noticias: [nova, ...state.noticias] })),

      removeNoticia: (index) =>
        set((state) => ({
          noticias: state.noticias.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "noticias-storage", // chave no localStorage
      getStorage: () => localStorage,
    }
  )
);
