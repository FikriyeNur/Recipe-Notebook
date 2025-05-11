function Error({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Bir hata oluştu!</strong>
      <br />
      {error}
    </div>
  );
}

export default Error;
