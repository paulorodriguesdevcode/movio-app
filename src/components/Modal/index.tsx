import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextareaAutosize } from "@material-ui/core";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { createMoviment } from "../../api/moviments";
import { TypeMovimentEnum } from "../../models/moviments";

const useStyles = makeStyles(() => ({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    width: 250,
    height: 50,
    marginTop: 50,
  },
}));

export default function ModalDefault() {
  const classes = useStyles();

  const [typeOperation, setTypeOperation] = useState<string | undefined>();
  const handleChangeTypeOperation = (event: SelectChangeEvent) => {
    setTypeOperation(event.target.value);
  };
  
  const [description, setDescription] = useState<string | undefined>();
  const handleChangeDescription = (event: SelectChangeEvent) => {
    setDescription(event.target.value);
  };

  const [valueOperation, setValueOperation] = useState<string | undefined>();
  const handleChangeValue = (event: SelectChangeEvent) => {
    setValueOperation(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newMoviment = async () => { 
    try {
      console.log("Vai chamar: createMoviment", typeOperation, valueOperation, description);
      const retornoCreate = await createMoviment(typeOperation, valueOperation, description);
      alert(retornoCreate);
      handleClose();
    } catch (e) {
      console.log("Não foi possivel inserir, error: ", e);
    }
  };

  return (
    <div>
      <Box className={classes.button}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.add}
        >
          Novo Lançamento
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fluxo de caixa</DialogTitle>
        <form>
          <DialogContent>
            <InputLabel id="demo-simple-select-standard-label">
              Tipo de operação
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={typeOperation}
              onChange={handleChangeTypeOperation}
              label="Tipo de lançamento"
              fullWidth
            >
              <MenuItem value={"DEPOSIT"}>DEPOSIT</MenuItem>
              <MenuItem value={"WITHDRAW"}>WITHDRAW</MenuItem>
            </Select>

            <TextField
              margin="dense"
              id="valor"
              label="Valor"
              onChange={(event) => setValueOperation(event.target.value)}
              fullWidth
              variant="standard"
              type="number"
            />

            <TextareaAutosize
              id="descricao"
              aria-label="Descrição"
              onChange={(event) => setDescription(event.target.value)}
              style={{
                width: "100%",
                height: 80,
                marginTop: 10,
                borderColor: "#80727B",
              }}
              placeholder="Descrição"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancelar
            </Button>
            <Button
              color="success"
              variant="outlined"
              onClick={() =>
                newMoviment()
              }
            >
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
