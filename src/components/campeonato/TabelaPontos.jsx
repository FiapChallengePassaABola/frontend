function TabelaPontos(){
    const teams = [
        { id: 1,  name: "Flamengo",    logo: "🦅", played: 7, wins: 5, draws: 0, losses: 2, gf: 15, ga: 7,  points: 15, form: "WWLWL" },
        { id: 2,  name: "Palmeiras",   logo: "🌿", played: 7, wins: 4, draws: 0, losses: 3, gf: 12, ga: 6,  points: 12, form: "LWWWL" },
        { id: 3,  name: "São Paulo",   logo: "⚽", played: 7, wins: 3, draws: 1, losses: 3, gf: 10, ga: 8,  points: 10, form: "WDLWL" },
        { id: 4,  name: "Santos",      logo: "🐋", played: 7, wins: 2, draws: 2, losses: 3, gf: 8,  ga: 9,  points: 8,  form: "DLLWW" },
        { id: 5,  name: "Corinthians", logo: "⚡", played: 7, wins: 2, draws: 1, losses: 4, gf: 7,  ga: 10, points: 7,  form: "LWLDL" },
        { id: 6,  name: "Vasco",       logo: "⚓", played: 7, wins: 1, draws: 3, losses: 3, gf: 6,  ga: 9,  points: 6,  form: "DDLWL" },
        { id: 7,  name: "Botafogo",    logo: "⭐", played: 7, wins: 1, draws: 2, losses: 4, gf: 5,  ga: 10, points: 5,  form: "LDLLD" },
        { id: 8,  name: "Fluminense",  logo: "🌊", played: 7, wins: 1, draws: 1, losses: 5, gf: 4,  ga: 11, points: 4,  form: "LLWLL" },
    ].map(t => ({ ...t, gd: t.gf - t.ga }));

    const sorted = [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
    });

    const formDot = (c) => {
        if (c === 'W') return 'bg-emerald-500';
        if (c === 'D') return 'bg-gray-400';
        return 'bg-rose-500';
    };

    return(
        <div className="w-full max-w-7xl mx-auto">
            <div className="rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 bg-[#140913]/80">
                <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-r from-emerald-700/70 to-lime-700/70 border-b border-white/10">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center">Tabela de Liderança</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-white/90 text-xs sm:text-sm bg-black/30">
                                <th className="px-3 py-3 text-left font-semibold">Pos</th>
                                <th className="px-3 py-3 text-left font-semibold">Clube</th>
                                <th className="px-3 py-3 text-center font-semibold">J</th>
                                <th className="px-3 py-3 text-center font-semibold">V</th>
                                <th className="px-3 py-3 text-center font-semibold">E</th>
                                <th className="px-3 py-3 text-center font-semibold">D</th>
                                <th className="px-3 py-3 text-center font-semibold">GP</th>
                                <th className="px-3 py-3 text-center font-semibold">GC</th>
                                <th className="px-3 py-3 text-center font-semibold">SG</th>
                                <th className="px-3 py-3 text-center font-semibold">Pts</th>
                                <th className="px-3 py-3 text-center font-semibold">Forma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((t, idx) => (
                                <tr key={t.id} className={`relative text-white text-xs sm:text-sm lg:text-base`}>
                                    <td className="px-3 py-3 align-middle">
                                        <div className={`w-8 h-8 grid place-items-center rounded-full text-xs sm:text-sm font-extrabold border ${idx === 0 ? 'bg-emerald-500/90 border-emerald-300' : idx === 1 ? 'bg-emerald-400/90 border-emerald-300' : idx === 2 ? 'bg-emerald-300/90 border-emerald-200' : 'bg-white/10 border-white/20'}`}>{idx + 1}</div>
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center bg-white/10 border border-white/30">
                                                <span className="text-lg sm:text-xl">{t.logo || '⚽'}</span>
                                            </div>
                                            <span className="font-semibold">{t.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-center align-middle">{t.played}</td>
                                    <td className="px-3 py-3 text-center align-middle">{t.wins}</td>
                                    <td className="px-3 py-3 text-center align-middle">{t.draws}</td>
                                    <td className="px-3 py-3 text-center align-middle">{t.losses}</td>
                                    <td className="px-3 py-3 text-center align-middle">{t.gf}</td>
                                    <td className="px-3 py-3 text-center align-middle">{t.ga}</td>
                                    <td className="px-3 py-3 text-center align-middle font-semibold">{t.gd}</td>
                                    <td className="px-3 py-3 text-center align-middle font-bold">{t.points}</td>
                                    <td className="px-3 py-3 text-center align-middle">
                                        <div className="flex items-center justify-center gap-1">
                                            {t.form.split('').map((c, i) => (
                                                <span key={i} className={`h-2.5 w-2.5 rounded-full ${formDot(c)}`}></span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default TabelaPontos