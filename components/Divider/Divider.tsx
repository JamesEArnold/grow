type DividerProps = {
  title?: string,
}

export const Divider = ({ title }: DividerProps) => <div className="relative flex py-5 items-center max-w-3xl mx-auto">
  <div className="flex-grow border-t border-slate-400 mx-6"></div>
  { title
    ? <><span className="flex-shrink text-slate-400">{title}</span>
      <div className="flex-grow border-t mx-6 border-slate-400"></div></>
    : <></>
  }
</div>;
