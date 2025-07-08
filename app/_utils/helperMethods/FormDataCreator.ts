export function FormDataCreator(data: any) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined)
      formData.append(key, value as any);
  }
  return formData;
}
