import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

export default function DesignacionesRegistro({
  AccionABMC,
  Arbitros,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo IdArbitro */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdArbitro">
                Arbitro<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <select
                {...register("IdArbitro", {
                    required: { value: true, message: "Arbitro es requerido" },
                })}
                className={
                    "form-control " +
                    (errors?.IdArbitro ? "is-invalid" : "")
                }
                >
                <option value="" key={1}></option>
                {Arbitros?.map((x) => (
                    <option value={x.IdArbitro} key={x.IdArbitro}>
                    {x.NombreApellido}
                    </option>
                ))}
                </select>
                <div className="invalid-feedback">
                {errors?.IdArbitro?.message}
                </div>

            </div>
          </div>


            {/* campo Descripcion */}
            <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="Descripcion">
                Descripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Descripcion" , {
                    requiered: { value: true, message: "Campo requerido" },
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    maxLength: { value: 60, message: "Máximo 60 caracteres" },
                })}
                autoFocus
                className= {
                    "form-control " + (errors.Descripcion ? "is-invalid" : "")
                }
              />
              {errors.Descripcion && touchedFields.Descripcion && (
                <div className ="invalidfeedback">
                  {errors?.Descripcion?.message}
                </div>)
                }
            </div>
          </div>
          
          {/* campo Confirmada */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Confirmada">
                Confirmada<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("Confirmada")}
                className="form-control"
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>
          
          
          
          
          {/* campo FechaDesignacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaDesig">
                Fecha De Designacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("FechaDesig", {
                    required: { value: true, message: "Fecha de Designacion es requerido" },
                })}
                className={
                    "form-control " + (errors?.FechaDesig ? "is-invalid" : "")
                }
                />
                <div className="invalid-feedback">
                {errors?.FechaDesig?.message}
                </div>

            </div>
          </div>


        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
            <div className="row alert alert-danger mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                Revisar los datos ingresados...
            </div>
            )}

      </div>
    </form>
  );
}
