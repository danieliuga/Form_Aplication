
export function validateDNI(dni, country) {

  if (country === 'España') {
    
    const dniRegExp = /^[0-9]{8}[A-HJ-NP-TV-Z]$/;

  if (!dni.match(dniRegExp)) {
    return false;
  }

  const letter = dni.charAt(dni.length - 1).toUpperCase();
  const number = dni.substr(0, dni.length - 1);
  const letterValues = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const validLetter = letterValues.charAt(Number(number) % 23);
  return letter === validLetter;

  } else if (country === 'Argentina') {
    const dniRegExp = /^[0-9]{8}$/;
    return dni.match(dniRegExp) !== null;
  } else if (country === 'Rumania') {
    const dniRegExp = /^[0-9]{6}[A-Z]{2}$/;
    return dni.match(dniRegExp) !== null;
  }
  return false;
};
