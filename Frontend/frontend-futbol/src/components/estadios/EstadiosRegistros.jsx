import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

export default function EstadiosRegistro({
  AccionABMC,
  Partidos,
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

        {/* campo nombreestadio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="NombreEstadio">
                Nombre Estadio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("NombreEstadio" , {
                    requiered: { value: true, message: "Campo requerido" },
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    maxLength: { value: 60, message: "Máximo 60 caracteres" },
                })}
                autoFocus
                className= {
                    "form-control " + (errors.NombreEstadio ? "is-invalid" : "")
                }
              />
              {errors.NombreEstadio && touchedFields.NombreEstadio && (
                <div className ="invalidfeedback">
                  {errors?.NombreEstadio?.message}
                </div>)
                }
            </div>
          </div>

          {/* campo IdPartido */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdPartido">
                Id Partido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <select
                {...register("IdPartido", {
                    required: { value: true, message: "IdPartido es requerido" },
                })}
                className={
                    "form-control " +
                    (errors?.IdPartido ? "is-invalid" : "")
                }
                >
                <option value="" key={1}></option>
                {Estadios?.map((x) => (
                    <option value={x.IdEstadio} key={x.IdEstadio}>
                    {x.NombreEstadio}
                    </option>
                ))}
                </select>
                <div className="invalid-feedback">
                {errors?.IdEstadio?.message}
                </div>

            </div>
          </div>

          
          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ActivoEstadio">
                Activo Estadio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("ActivoEstadio")}
                className="form-control"
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
            </div>
          </div>
          
          
          
          
          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaEstadio">
                Fecha De Estadio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("FechaEstadio", {
                    required: { value: true, message: "Fecha de Estadio es requerido" },
                })}
                className={
                    "form-control " + (errors?.FechaEstadio ? "is-invalid" : "")
                }
                />
                <div className="invalid-feedback">
                {errors?.FechaEstadio?.message}
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
