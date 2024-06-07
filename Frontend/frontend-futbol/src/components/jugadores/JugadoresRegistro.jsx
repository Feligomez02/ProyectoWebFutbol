
import React from "react";
import { useForm } from "react-hook-form";

export default function JugadoresRegistro({
  AccionABMC,
  Equipos,
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

        {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre" , {
                    requiered: { value: true, message: "Campo requerido" },
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    maxLength: { value: 60, message: "Máximo 60 caracteres" },
                })}
                autoFocus
                className= {
                    "form-control " + (errors.Nombre ? "is-invalid" : "")
                }
              />
              {errors.Nombre && touchedFields.Nombre && (
                <div className ="invalidfeedback">
                  {errors?.Nombre?.message}
                </div>)
                }
            </div>
          </div>

          {/* campo IdEquipo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdEquipo">
                Equipo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <select
                {...register("IdEquipo", {
                    required: { value: true, message: "Equipo es requerido" },
                })}
                className={
                    "form-control " +
                    (errors?.IdEquipo ? "is-invalid" : "")
                }
                >
                <option value="" key={1}></option>
                {Equipos?.map((x) => (
                    <option value={x.IdEquipo} key={x.IdEquipo}>
                    {x.Nombre}
                    </option>
                ))}
                </select>
                <div className="invalid-feedback">
                {errors?.IdEquipo?.message}
                </div>

            </div>
          </div>

          
          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("Activo")}
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
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha De Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("FechaNacimiento", {
                    required: { value: true, message: "Fecha de Nacimiento es requerido" }
                })}
                className={
                    "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
                />
                <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
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
