import { useState } from "react";
import edit from "../../assets/edit.png";
import CardJogadoras from "./components/CardJogadoras";
import useButton from "../../store/state";
import {Button, Box} from "@mui/material";
import PontosJogadoras from "./components/PontosJogadoras";


function TesteRoute() {
  const { componentChange } = useButton();
    
  const [name, setName] = useState("Campeonato PAB");
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function finishEditing() {
        setIsEditing(false);
     }

     function handleKeyDown(e) {
        if (e.key === "Enter") {
            finishEditing();
        }
    }
  
  
  return (
    <Box display="flex" flexDirection="column">
        {/* Voltar */}
        <Button
            onClick={() => {
            componentChange(false);
            }}
            sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            maxWidth: "15%",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            }}
        >
            Voltar
        </Button>

        {/* Titulo Editavel */}
        <div className="flex flex-col items-center m-10">
            <div className="flex items-center justify-center">
                {isEditing ? (
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={finishEditing}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="text-5xl font-bold text-[#D9D9D9] bg-transparent border-b border-gray-500 focus:outline-none px-8 text-center"
                    />
                ) : (
                    <h1 className="text-5xl font-bold text-[#D9D9D9] px-8">
                    {name}
                    </h1>
                )}
            <button onClick={handleEdit}>
                <img src={edit} alt="edit" className="w-[2.8rem]" />
            </button>
            </div>
            <div className="bg-[#828282] w-1/2 h-[1px] mt-7"></div>
        </div>

        <div className="flex justify-around">
            {/* Lado esquerdo pessoas e pontos */}
            <div className="w-1/4 p-3 border-2 rounded-3xl border-white">
                <CardJogadoras name="tia Cotinha" pontos="10" idade="19" tempo="03:15"/>
                <CardJogadoras name="tia Cotinha" pontos="10" idade="19" tempo="03:15"/>
                <CardJogadoras name="tia Cotinha" pontos="10" idade="19" tempo="03:15"/>
                <CardJogadoras name="tia Cotinha" pontos="10" idade="19" tempo="03:15"/>
                <CardJogadoras name="tia Cotinha" pontos="10" idade="19" tempo="03:15"/>
            </div>

            {/* Lado Direito classificação */}
            <div className="flex flex-col justify-around p-3 border-2 rounded-3xl border-white w-2/3">
                <PontosJogadoras name="tia Cotinha" pontos="10" tempo="03:15"/>
                <PontosJogadoras name="tia Cotinha" pontos="10" tempo="03:15"/>
                <PontosJogadoras name="tia Cotinha" pontos="10" tempo="03:15"/>
                <PontosJogadoras name="tia Cotinha" pontos="10" tempo="03:15"/>
                <PontosJogadoras name="tia Cotinha" pontos="10" tempo="03:15"/>
            </div>
        </div>
        
          
    </Box>
  )
}

export default TesteRoute