/*
src/Instance/Instance.ts

Defines the Instance abstract class.
 */

export abstract class Instance
{
    public Name: string;
    private _parent: Instance | null = null;
    private _children: Instance[] = [];

    protected constructor()
    { this.Name = `New${(this.constructor as typeof Instance).name}`; }

    public get ClassName(): string
    { return (this.constructor as typeof Instance).name; }

    public get Parent(): Instance | null
    { return this._parent; }

    public set Parent(parent: Instance) {
        if (this._parent === parent)
        { return; }

        let currentParent: Instance | null = parent;
        while (currentParent)
        {
            if (currentParent === this)
            { throw new Error("Cannot set parent to a descendant or self!"); }

            currentParent = currentParent.Parent;
        }

        if (this._parent)
        {
            const index: number = this._parent._children.indexOf(this);

            if (index != -1)
            { this._parent._children.splice(index, 1); }
        }

        this._parent = parent;
        parent._children.push(this);
    }

    public ClearAllChildren(): void
    {
        for (let child of [...this._children])
        { child.Destroy(); }
    }

    public Destroy(): void
    {
        for (let child of [...this._children])
        { child.Destroy(); }
        this._children = [];

        if (this._parent)
        {
            const index: number = this._parent._children.indexOf(this);

            if (index != -1)
            { this._parent._children.splice(index, 1); }
        }
        this._parent = null;
    }

    public FindFirstChild(name: string): Instance | null
    {
        for (let child of this._children)
        {
            if (child.Name === name)
            { return child; }
        }

        return null;
    }

    public GetChildren(): Instance[]
    { return [...this._children]; }
}
