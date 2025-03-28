/* // Verificação inicial
console.log("🔥 Script WhatsApp iniciado");

// Configurações
const config = {
    whatsappNumber: '5571999536561', // Mantenha sem +55
    empresa: 'Reino Animal & Cia'
};

// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM carregado");
    
    // Verifica elementos essenciais
    const $form = $('#whatsappForm');
    if (!$form.length) {
        console.error("❌ Formulário não encontrado");
        return;
    }

    // Máscaras
    $('#telefone').mask('(00) 00000-0000', {
        onKeyPress: function(value) {
            const digits = value.replace(/\D/g, '');
            return digits.length <= 11; // Aceita 11 dígitos
        }
    });

    $('#hora').mask('00:00', {
        translation: {
            '0': { pattern: /[0-9]/ },
            ':': { pattern: /:/, fallback: ':' }
        },
        onKeyPress: function(value) {
            const [hours, minutes] = value.split(':').map(Number);
            const $field = $(this);
            $field.toggleClass('is-invalid', hours > 23 || minutes > 59);
            $field.toggleClass('is-valid', value.length === 5);
        }
    });

    // Envio do formulário
    $form.on('submit', function(e) {
        e.preventDefault();
        console.log("📤 Enviando formulário...");

        // Validação
        const $telefone = $('#telefone');
        const telefone = $telefone.cleanVal().replace(/\D/g, '');
        
        if (telefone.length < 11) {
            $telefone.addClass('is-invalid');
            $('#telefoneError').show();
            return;
        }

        // Coleta dados
        const dados = {
            nome: $('#nome').val().trim(),
            telefone: telefone,
            pet: $('#pet').val().trim(),
            servico: $('#servico').val(),
            data: $('#data').val() ? new Date($('#data').val()).toLocaleDateString('pt-BR') : "A combinar",
            hora: $('#hora').val().trim() || "A combinar"
        };

        // Monta mensagem
        const mensagem = `*📋 AGENDAMENTO - ${config.empresa.toUpperCase()}*%0A%0A` +
                        `▪️ *Cliente:* ${dados.nome}%0A` +
                        `▪️ *WhatsApp:* +55${dados.telefone}%0A` +
                        `▪️ *Pet:* ${dados.pet}%0A` +
                        `▪️ *Serviço:* ${dados.servico}%0A` +
                        `▪️ *Data:* ${dados.data}%0A` +
                        `▪️ *Horário:* ${dados.hora}%0A%0A` +
                        `_Mensagem enviada via site_`;

        const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
        console.log("🔗 URL gerada:", url);

        // Feedback visual
        const $btn = $(this).find('button');
        $btn.html('<i class="fas fa-spinner fa-spin me-2"></i> Enviando...').prop('disabled', true);

        // Abre WhatsApp
        setTimeout(() => {
            window.open(url, '_blank');
            $btn.html('<i class="fab fa-whatsapp me-2"></i> Enviar').prop('disabled', false);
            $form.trigger('reset');
        }, 1000);
    });
}); */