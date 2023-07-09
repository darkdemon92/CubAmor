import { Formik, Form, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { SendMensaje } from "../../querys/mutations/MessagesMutations";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import SendIcon from "@mui/icons-material/Send";

export default function SendMessage({
  openmsg,
  setOpenmsg,
  user_id,
  destinatario,
}) {
  const [CreateMensaje, { loading }] = useMutation(SendMensaje);
  return (
    <Dialog open={openmsg} onClose={() => setOpenmsg(false)}>
      <DialogTitle>
        <IconButton
          sx={{ mt: 0, ml: "95%" }}
          aria-label="close"
          color="error"
          size="small"
          onClick={() => setOpenmsg(false)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        Enviar Mensaje <br />
      </DialogTitle>
      <Formik
        initialValues={{ mensaje: "" }}
        //validationSchema={validationSchema}
        onSubmit={async (
          { mensaje },
          { resetForm, setSubmitting, setFieldError }
        ) => {
          // Aquí irá la lógica para enviar los datos del formulario al servidor
          //console.log(user_id, destinatario, mensaje);
          try {
            await CreateMensaje({
              variables: { user_id, destinatario, mensaje },
            });
            resetForm();
            setSubmitting(false);
            setOpenmsg(false);
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            setFieldError("mensaje", error.message);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
        }) => (
          <Form>
            <DialogContent>
              {loading && (
                <DialogContentText>
                  <br />
                  <br />
                  <LinearProgress />
                  <br />
                  <Typography
                    component="h1"
                    variant="h6"
                    style={{ color: "green" }}
                  >
                    Enviando Mensaje...
                  </Typography>
                  <br />
                  <br />
                  <br />
                </DialogContentText>
              )}
              {!loading && (
                <DialogContentText>
                  Recuerde ser respetuoso/a...
                </DialogContentText>
              )}
              <br />
              <>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="mensaje"
                    label="Escriba su Mens@je aquí:"
                    name="mensaje"
                    autoComplete="mensaje"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mensaje}
                    autoFocus
                  />
                  <ErrorMessage
                    name="mensaje"
                    component={() => (
                      <Alert severity="warning">{errors.mensaje}</Alert>
                    )}
                  />
                </div>
              </>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 1, mb: 1 }}
                disabled={isSubmitting || !isValid}
                endIcon={<SendIcon />}
              >
                Enviar Mensaje
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
