import React, { useState } from 'react';
import Botao from './ui/Botao';

const FormularioNoticias = () => {
  // Estados para armazenar os valores do formulário
  const [nomeVideo, setNomeVideo] = useState('');
  const [descricaoVideo, setDescricaoVideo] = useState('');
  const [materia, setMateria] = useState('');
  const [imagem, setImagem] = useState(null); // Para armazenar o arquivo ou URL da imagem

  // Funções de manipulação para o submit do formulário e o upload de imagem (simuladas)
  const handleSubmit = (e, acao) => {
    e.preventDefault();
    const dadosNoticia = {
      nomeVideo,
      descricaoVideo,
      materia,
      imagem: imagem ? imagem.name : 'Nenhuma imagem selecionada', // Exemplo de como usar a informação
      acao // 'postar' ou 'agendar'
    };

    console.log(`Ação: ${acao}`, dadosNoticia);
    alert(`Notícia pronta para ${acao}! Veja o console para os dados.`);

    // Aqui você faria a chamada à API ou lógica de estado global
  };

  const handleImagemChange = (e) => {
    // Armazena o objeto File no estado
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-b from-[#13654F] to-[#25896E] rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-white border-b pb-2 mb-4">Adicionar Nova Notícia</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Seção Principal: Nome, Descrição e Imagem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna Esquerda: Nome e Descrição */}
          <div className="md:col-span-2 space-y-4">
            {/* Input Nome do Vídeo */}
            <div>
              <label htmlFor="nomeVideo" className="block text-sm font-medium text-white">
                Nome do Vídeo / Título da Notícia
              </label>
              <input
                id="nomeVideo"
                type="text"
                value={nomeVideo}
                onChange={(e) => setNomeVideo(e.target.value)}
                placeholder="Ex: Lançamento do Novo Produto X"
                required
                className="mt-1 block w-full px-3 py-2 border border-white bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#A259FF] focus:border-[#A259FF] sm:text-sm"
              />
            </div>

            {/* Textarea Descrição do Vídeo */}
            <div>
              <label htmlFor="descricaoVideo" className="block text-sm font-medium text-white">
                Descrição Curta
              </label>
              <textarea
                id="descricaoVideo"
                value={descricaoVideo}
                onChange={(e) => setDescricaoVideo(e.target.value)}
                rows="3"
                placeholder="Um breve resumo para a listagem."
                required
                className="mt-1 block w-full px-3 py-2 border border-white bg-white rounded-md focus:outline-none focus:ring-[#A259FF] focus:border-[#A259FF]  sm:text-sm"
              />
            </div>
          </div>

          {/* Coluna Direita (Imagem) */}
          <div className="md:col-span-1 flex flex-col items-center justify-start border p-4 rounded-md bg-gray-50">
            <label htmlFor="imagemUpload" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem / Thumbnail
            </label>
            <input
              id="imagemUpload"
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#A259FF] hover:file:bg-blue-100"
            />
            {imagem && (
              <p className="mt-2 text-xs text-gray-500">
                Selecionado: {imagem.name}
              </p>
            )}
            {!imagem && (
              <div className="mt-2 w-full h-24 bg-gray-200 flex items-center justify-center rounded-md text-gray-400 text-sm">
                Prévia da Imagem
              </div>
            )}
          </div>
        </div>

        {/* Campo para a Matéria (abaixo de tudo) */}
        <div>
          <label htmlFor="materia" className="block text-sm font-medium text-white">
            Conteúdo Completo da Matéria
          </label>
          <textarea
            id="materia"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            rows="10"
            placeholder="Insira aqui todo o conteúdo detalhado da sua notícia..."
            required
            className="mt-1 block w-full px-3 py-2 border border-white bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#A259FF] focus:border-[#A259FF]  sm:text-sm resize-y"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-white">
          <Botao
            onClick={(e) => handleSubmit(e, 'agendar')}
            className="px-4 py-2 text-sm font-medium "
          >
            Agendar Publicação
          </Botao>
          <Botao
            onClick={(e) => handleSubmit(e, 'postar')}
            className="px-4 py-2 text-sm font-medium"
          >
            Postar Agora
          </Botao>
        </div>
      </form>
    </div>
  );
};

export default FormularioNoticias;