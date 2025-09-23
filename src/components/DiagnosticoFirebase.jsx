import { useState } from 'react';
import { auth, db, realtimeDb } from '../config/firebase';

const DiagnosticoFirebase = () => {
  const [diagnostico, setDiagnostico] = useState(null);
  const [testando, setTestando] = useState(false);

  const executarDiagnostico = async () => {
    setTestando(true);
    setDiagnostico(null);

    const resultados = {
      configuracao: false,
      firestore: false,
      realtimeDatabase: false,
      auth: false,
      detalhes: []
    };

    try {
      if (realtimeDb && db && auth) {
        resultados.configuracao = true;
        resultados.detalhes.push('✅ Configuração básica do Firebase: OK');
      } else {
        resultados.detalhes.push('❌ Configuração básica do Firebase: FALHOU');
        throw new Error('Configuração básica do Firebase não encontrada');
      }

      try {
        const { getDocs, collection } = await import('firebase/firestore');
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        resultados.firestore = true;
        resultados.detalhes.push('✅ Firestore: Conectado com sucesso');
      } catch (error) {
        resultados.detalhes.push(`❌ Firestore: ${error.message}`);
      }

      try {
        const { get, ref } = await import('firebase/database');
        const testRef = ref(realtimeDb, 'test');
        await get(testRef);
        resultados.realtimeDatabase = true;
        resultados.detalhes.push('✅ Realtime Database: Conectado com sucesso');
      } catch (error) {
        resultados.detalhes.push(`❌ Realtime Database: ${error.message}`);
      }

      try {
        const { signInAnonymously } = await import('firebase/auth');
        await signInAnonymously(auth);
        resultados.auth = true;
        resultados.detalhes.push('✅ Authentication: Funcionando');
      } catch (error) {
        resultados.detalhes.push(`❌ Authentication: ${error.message}`);
      }

    } catch (error) {
      resultados.detalhes.push(`❌ Erro geral: ${error.message}`);
    }

    setDiagnostico(resultados);
    setTestando(false);
  };

  const testarEscritaRealtime = async () => {
    try {
      const { set, ref, push } = await import('firebase/database');
      const testRef = ref(realtimeDb, 'teste-escrita');
      const newRef = push(testRef);
      
      await set(newRef, {
        timestamp: new Date().toISOString(),
        teste: 'Dados de teste salvos com sucesso!',
        usuario: 'diagnostico'
      });
      
      alert('✅ Teste de escrita no Realtime Database: SUCESSO!\n\nVerifique o Firebase Console para confirmar que os dados foram salvos.');
    } catch (error) {
      alert(`❌ Teste de escrita no Realtime Database: FALHOU\n\nErro: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#521E2B] mb-6">
        Diagnóstico Firebase - PassaBola
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Testes de Conexão</h2>
        
        <button
          onClick={executarDiagnostico}
          disabled={testando}
          className="bg-[#521E2B] text-white px-6 py-3 rounded hover:bg-[#3a1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {testando ? 'Executando Diagnóstico...' : 'Executar Diagnóstico Completo'}
        </button>

        {diagnostico && (
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Resultados:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className={`p-3 rounded text-center ${diagnostico.configuracao ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-semibold">Configuração</div>
                <div>{diagnostico.configuracao ? 'OK' : 'ERRO'}</div>
              </div>
              <div className={`p-3 rounded text-center ${diagnostico.firestore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-semibold">Firestore</div>
                <div>{diagnostico.firestore ? 'OK' : 'ERRO'}</div>
              </div>
              <div className={`p-3 rounded text-center ${diagnostico.realtimeDatabase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-semibold">Realtime DB</div>
                <div>{diagnostico.realtimeDatabase ? 'OK' : 'ERRO'}</div>
              </div>
              <div className={`p-3 rounded text-center ${diagnostico.auth ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-semibold">Auth</div>
                <div>{diagnostico.auth ? 'OK' : 'ERRO'}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Detalhes:</h4>
              <ul className="space-y-1 text-sm">
                {diagnostico.detalhes.map((detalhe, index) => (
                  <li key={index}>{detalhe}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Teste de Escrita</h2>
        <p className="text-gray-600 mb-4">
          Este teste irá tentar escrever dados no Realtime Database para verificar se a operação de salvamento está funcionando.
        </p>
        
        <button
          onClick={testarEscritaRealtime}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Testar Escrita no Realtime Database
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Informações Importantes:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Certifique-se de que as regras do Firebase estão configuradas corretamente</li>
          <li>• Para Realtime Database: Regras devem permitir leitura/escrita</li>
          <li>• Para Firestore: Regras devem permitir leitura/escrita para usuários autenticados</li>
          <li>• Verifique o console do navegador para logs detalhados</li>
          <li>• Verifique o Firebase Console para confirmar que os dados estão sendo salvos</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <h3 className="font-semibold text-blue-800 mb-2">Regras Sugeridas para Firebase:</h3>
        <div className="text-sm text-blue-700">
          <div className="mb-2">
            <strong>Realtime Database:</strong>
            <pre className="bg-blue-100 p-2 rounded mt-1 text-xs overflow-x-auto">
{`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`}
            </pre>
          </div>
          <div>
            <strong>Firestore:</strong>
            <pre className="bg-blue-100 p-2 rounded mt-1 text-xs overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoFirebase;
