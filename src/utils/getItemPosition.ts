type GetItemPositionProps = {
  items: { id: string | number }[]
  id: string | number
}

export const getItemPosition = ({ items, id }: GetItemPositionProps) =>
  items.findIndex((item) => item.id === id)
