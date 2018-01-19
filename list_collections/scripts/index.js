// Class to represent a row in the seat reservations grid
function ProductoSucursal(name, producto,cantidad=1) {
    var self = this;
    self.name = name;
    self.producto = ko.observable(producto);
    self.cantidad=ko.observable(cantidad*1);
    self.formattedSubtotal=ko.computed(function(){
        return self.cantidad()*1*self.producto().price*1
    });
    
    self.formattedPrice=ko.computed(function(){
        let price=self.producto().price;
        return price ? "$"+price.toFixed(2):"-";
    })
}

// Overall viewmodel for this screen, along with initial state
function ProductoSucursalViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableProducto = [
        { nombre: "Fertilizante 1", price: 0 },
        { nombre: "Fertilizantes Varios", price: 34.95 },
        { nombre: "otros", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new ProductoSucursal("Banaoro", self.availableProducto [1]),
        new ProductoSucursal("Agrofertil", self.availableProducto [0])
    ]);
    
    self.addProducto=function(){
        self.seats.push(new ProductoSucursal("", self.availableProducto [1]))
    }

    self.limit=5;
    
    self.quitarProducto=function(pro){
        self.seats.remove(pro)
    }

    self.calcularTotales=ko.computed(function(){
        return self.seats().reduce((ant,act)=>ant+act.formattedSubtotal()*1,0)
    });
}

ko.applyBindings(new ProductoSucursalViewModel());